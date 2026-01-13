"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.signToken = signToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
function requireAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer '))
        return res.status(401).json({ ok: false, code: 'ERR_UNAUTHORIZED', message: 'Missing token' });
    const token = auth.slice(7);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.auth = decoded;
        return next();
    }
    catch (e) {
        return res.status(401).json({ ok: false, code: 'ERR_UNAUTHORIZED', message: 'Invalid token' });
    }
}
function signToken(payload, expiresIn = '1h') {
    // cast to any to satisfy type mismatches in this environment
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn });
}
exports.default = { requireAuth, signToken };
