import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';
const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';
const DEV_PRIVATE_KEY = process.env.SERVER_PRIVATE_KEY || process.env.DEV_PRIVATE_KEY || '';

/**
 * signingService provides an abstraction for signing messages and transactions.
 * - In DEV mode it will create a local ethers.Wallet from env private key.
 * - In PROD mode it exposes the structure for KMS/HSM backing (TODO: integrate real KMS).
 * Never expose raw keys outside this module.
 */

export async function getSigner(chainId: number): Promise<ethers.Signer> {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  if (ENV !== 'production') {
    if (!DEV_PRIVATE_KEY) throw new Error('DEV_PRIVATE_KEY not configured for signing in non-prod');
    const wallet = new ethers.Wallet(DEV_PRIVATE_KEY, provider);
    return wallet;
  }

  // PROD: stub KMS-backed signer
  // TODO: integrate with AWS KMS / Azure Key Vault / HSM
  // For now, throw until real KMS is wired to avoid accidental key use.
  throw new Error('KMS signer not implemented. Configure signingService for production');
}

export async function signMessage(chainId: number, message: string | Uint8Array): Promise<string> {
  const signer = await getSigner(chainId);
  // ethers.Signer.signMessage accepts string or Uint8Array
  const sig = await signer.signMessage(message as any);
  return sig;
}

export async function signTransaction(chainId: number, tx: ethers.TransactionRequest): Promise<string> {
  const signer = await getSigner(chainId);
  // For convenience, sign the transaction but we will instead send via signer.sendTransaction
  // If caller wants raw signed tx, they can use signer._signTypedData or populate and sign.
  if ((signer as any).sendTransaction) {
    // return tx.hash after sending
    const sent = await (signer as ethers.Wallet).sendTransaction(tx);
    return sent.hash;
  }
  throw new Error('signTransaction unsupported for this signer');
}

export default { getSigner, signMessage, signTransaction };
