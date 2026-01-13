import { useEffect, useState } from 'react';
import apiClient from '../lib/apiClient';
import { BrowserProvider } from 'ethers';

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if ((window as any).ethereum) {
      const eth = (window as any).ethereum;
      eth.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts && accounts[0]) setAddress(accounts[0]);
      }).catch(()=>{});
      eth.request({ method: 'eth_chainId' }).then((id: string) => setChainId(parseInt(id, 16))).catch(()=>{});
      eth.on && eth.on('accountsChanged', (accounts: string[]) => setAddress(accounts[0] || null));
      eth.on && eth.on('chainChanged', (id: string) => setChainId(parseInt(id, 16)));
    }
  }, []);

  async function connect() {
    if (!(window as any).ethereum) return alert('No injected wallet found');
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    try {
      const addr = await signer.getAddress();
      setAddress(addr);
      const network = await provider.getNetwork();
      setChainId(network.chainId);
      setConnected(true);
    } catch (e) {
      console.error('connect failed', e);
    }
  }

  async function signIn() {
    if (!address) return alert('Connect wallet first');
    try {
      const nonceResp = await apiClient.getNonce(address);
      const nonce = nonceResp?.nonce || `Sign in to AGIS at ${Date.now()}`;
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const message = `AGIS Sign-in nonce: ${nonce}`;
      const signature = await signer.signMessage(message);
      const resp = await apiClient.signIn(address, signature, nonce);
      if (resp?.token) {
        alert('Signed in');
      } else {
        alert('Sign-in failed');
      }
    } catch (e) {
      console.error('signin error', e);
      alert('Sign-in error');
    }
  }

  return (
    <div>
      {address ? (
        <div>
          <p className="text-sm">Connected: {address}</p>
          <p className="text-xs">Chain: {chainId ?? '—'}</p>
          <div className="mt-2">
            <button className="px-3 py-1 bg-green-500 rounded" onClick={signIn}>Sign in</button>
          </div>
        </div>
      ) : (
        <div>
          <button className="px-3 py-1 bg-sky-500 rounded" onClick={connect}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
}
