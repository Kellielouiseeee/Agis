const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

let jwt: string | null = null;

function setToken(token: string | null) {
  jwt = token;
}

function authHeaders() {
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
}

async function getNonce(address: string) {
  const res = await fetch(`${API_BASE}/auth/nonce?address=${encodeURIComponent(address)}`);
  return res.json();
}

async function signIn(address: string, signature: string, nonce: string) {
  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, signature, nonce })
  });
  const data = await res.json();
  if (data?.token) setToken(data.token);
  return data;
}

async function refreshToken(refreshTokenId: string) {
  const res = await fetch(`${API_BASE}/auth/refresh`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshTokenId }) });
  const data = await res.json();
  if (data?.token) setToken(data.token);
  return data;
}

async function getXP(address: string) {
  const res = await fetch(`${API_BASE}/player/${encodeURIComponent(address)}/xp`, { headers: { ...authHeaders() } });
  return res.json();
}

async function getRewardsBalance(address: string) {
  const res = await fetch(`${API_BASE}/rewards/balance/${encodeURIComponent(address)}`, { headers: { ...authHeaders() } });
  return res.json();
}

async function claimRewards(payload: { address: string; to: string; amount: string }) {
  const res = await fetch(`${API_BASE}/rewards/claim`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(payload) });
  return res.json();
}

async function createGameSession(payload: { address: string; clientInfo?: any }) {
  const res = await fetch(`${API_BASE}/game/session`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(payload) });
  return res.json();
}

async function submitGameResult(payload: any) {
  const res = await fetch(`${API_BASE}/game/result`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(payload) });
  return res.json();
}

async function getTxStatus(jobId: string) {
  const res = await fetch(`${API_BASE}/tx/status/${encodeURIComponent(jobId)}`, { headers: { ...authHeaders() } });
  return res.json();
}

export default {
  setToken,
  getNonce,
  signIn,
  refreshToken,
  getXP,
  getRewardsBalance,
  claimRewards,
  createGameSession,
  submitGameResult,
  getTxStatus
};
