"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPECTED_CHAIN_ID = exports.RPC_URL = exports.DEV_MODE = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DEV_MODE = (process.env.DEV_MODE || 'false').toLowerCase() === 'true';
exports.RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';
exports.EXPECTED_CHAIN_ID = process.env.EXPECTED_CHAIN_ID ? Number(process.env.EXPECTED_CHAIN_ID) : undefined;
exports.default = { DEV_MODE: exports.DEV_MODE, RPC_URL: exports.RPC_URL, EXPECTED_CHAIN_ID: exports.EXPECTED_CHAIN_ID };
