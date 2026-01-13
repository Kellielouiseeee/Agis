import crypto from 'crypto';

export function validateSession(sessionId: any, address: any): boolean {
  if (!sessionId || typeof sessionId !== 'string') return false;
  if (sessionId.length > 128) return false;
  // basic pattern for generated sessions in this app: sess-<timestamp>-<num>
  if (!/^sess-[0-9]+-[0-9]+/.test(sessionId)) return false;
  if (!address || typeof address !== 'string') return false;
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) return false;
  return true;
}

export function validateScore(score: any): boolean {
  if (typeof score !== 'number') return false;
  if (!Number.isFinite(score)) return false;
  if (score < 0) return false;
  // reasonable upper bound for closed-beta
  if (score > 10_000_000) return false;
  return true;
}

export function validateDuration(durationMs: any): boolean {
  if (typeof durationMs !== 'number') return false;
  if (!Number.isFinite(durationMs)) return false;
  if (durationMs < 0) return false;
  // max 24 hours
  if (durationMs > 24 * 60 * 60 * 1000) return false;
  return true;
}

export function validateEventsHash(eventsHash: any, expected?: any): boolean {
  if (!eventsHash || typeof eventsHash !== 'string') return false;
  // allow 0x-prefixed 32-byte hex or base64 short fingerprints
  if (/^0x[0-9a-fA-F]{64}$/.test(eventsHash)) {
    if (expected && typeof expected === 'string') return eventsHash === expected;
    return true;
  }
  // accept base64-ish strings under 128 chars
  if (eventsHash.length > 0 && eventsHash.length <= 128) return true;
  return false;
}

export function validateProof(proof: any): boolean {
  if (!proof) return false;
  // proof may be a stringified signature/object; keep light validation
  if (typeof proof === 'string') {
    if (proof.length > 4096) return false;
    return true;
  }
  if (typeof proof === 'object') {
    // ensure it contains some expected properties or a small JSON
    try {
      const s = JSON.stringify(proof);
      if (s.length > 8192) return false;
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

export default { validateSession, validateScore, validateDuration, validateEventsHash, validateProof };
