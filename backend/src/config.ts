import dotenv from 'dotenv';
dotenv.config();

export const DEV_MODE = (process.env.DEV_MODE || 'false').toLowerCase() === 'true';
export const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';
export const EXPECTED_CHAIN_ID = process.env.EXPECTED_CHAIN_ID ? Number(process.env.EXPECTED_CHAIN_ID) : undefined;

export default { DEV_MODE, RPC_URL, EXPECTED_CHAIN_ID };
