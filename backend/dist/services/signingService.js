"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSigner = getSigner;
exports.signMessage = signMessage;
exports.signTransaction = signTransaction;
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ENV = process.env.NODE_ENV || 'development';
const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';
const DEV_PRIVATE_KEY = process.env.SERVER_PRIVATE_KEY || process.env.DEV_PRIVATE_KEY || '';
/**
 * signingService provides an abstraction for signing messages and transactions.
 * - In DEV mode it will create a local ethers.Wallet from env private key.
 * - In PROD mode it exposes the structure for KMS/HSM backing (TODO: integrate real KMS).
 * Never expose raw keys outside this module.
 */
async function getSigner(chainId) {
    const provider = new ethers_1.ethers.JsonRpcProvider(RPC_URL);
    if (ENV !== 'production') {
        if (!DEV_PRIVATE_KEY)
            throw new Error('DEV_PRIVATE_KEY not configured for signing in non-prod');
        const wallet = new ethers_1.ethers.Wallet(DEV_PRIVATE_KEY, provider);
        return wallet;
    }
    // PROD: stub KMS-backed signer
    // TODO: integrate with AWS KMS / Azure Key Vault / HSM
    // For now, throw until real KMS is wired to avoid accidental key use.
    throw new Error('KMS signer not implemented. Configure signingService for production');
}
async function signMessage(chainId, message) {
    const signer = await getSigner(chainId);
    // ethers.Signer.signMessage accepts string or Uint8Array
    const sig = await signer.signMessage(message);
    return sig;
}
async function signTransaction(chainId, tx) {
    const signer = await getSigner(chainId);
    // For convenience, sign the transaction but we will instead send via signer.sendTransaction
    // If caller wants raw signed tx, they can use signer._signTypedData or populate and sign.
    if (signer.sendTransaction) {
        // return tx.hash after sending
        const sent = await signer.sendTransaction(tx);
        return sent.hash;
    }
    throw new Error('signTransaction unsupported for this signer');
}
exports.default = { getSigner, signMessage, signTransaction };
