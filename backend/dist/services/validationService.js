"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = validateSession;
exports.validateScore = validateScore;
exports.validateDuration = validateDuration;
exports.validateEventsHash = validateEventsHash;
exports.validateProof = validateProof;
function validateSession(sessionId, address) {
    if (!sessionId || typeof sessionId !== 'string')
        return false;
    if (sessionId.length > 128)
        return false;
    // basic pattern for generated sessions in this app: sess-<timestamp>-<num>
    if (!/^sess-[0-9]+-[0-9]+/.test(sessionId))
        return false;
    if (!address || typeof address !== 'string')
        return false;
    if (!/^0x[0-9a-fA-F]{40}$/.test(address))
        return false;
    return true;
}
function validateScore(score) {
    if (typeof score !== 'number')
        return false;
    if (!Number.isFinite(score))
        return false;
    if (score < 0)
        return false;
    // reasonable upper bound for closed-beta
    if (score > 10000000)
        return false;
    return true;
}
function validateDuration(durationMs) {
    if (typeof durationMs !== 'number')
        return false;
    if (!Number.isFinite(durationMs))
        return false;
    if (durationMs < 0)
        return false;
    // max 24 hours
    if (durationMs > 24 * 60 * 60 * 1000)
        return false;
    return true;
}
function validateEventsHash(eventsHash, expected) {
    if (!eventsHash || typeof eventsHash !== 'string')
        return false;
    // allow 0x-prefixed 32-byte hex or base64 short fingerprints
    if (/^0x[0-9a-fA-F]{64}$/.test(eventsHash)) {
        if (expected && typeof expected === 'string')
            return eventsHash === expected;
        return true;
    }
    // accept base64-ish strings under 128 chars
    if (eventsHash.length > 0 && eventsHash.length <= 128)
        return true;
    return false;
}
function validateProof(proof) {
    if (!proof)
        return false;
    // proof may be a stringified signature/object; keep light validation
    if (typeof proof === 'string') {
        if (proof.length > 4096)
            return false;
        return true;
    }
    if (typeof proof === 'object') {
        // ensure it contains some expected properties or a small JSON
        try {
            const s = JSON.stringify(proof);
            if (s.length > 8192)
                return false;
            return true;
        }
        catch (e) {
            return false;
        }
    }
    return false;
}
exports.default = { validateSession, validateScore, validateDuration, validateEventsHash, validateProof };
