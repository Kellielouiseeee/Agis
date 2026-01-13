import { ethers } from 'hardhat';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const backendAddr = process.env.BACKEND_SIGNER_ADDRESS;
  const gameAddr = process.env.GAME_ENGINE_ADDRESS;
  if (!backendAddr || !gameAddr) {
    console.error('Please set BACKEND_SIGNER_ADDRESS and GAME_ENGINE_ADDRESS in env');
    process.exit(1);
  }
  const [deployer] = await ethers.getSigners();
  console.log('Running grant roles with', deployer.address);
  const game = await ethers.getContractAt('GameEngine', gameAddr, deployer);
  const ROLE = ethers.keccak256(ethers.toUtf8Bytes('GAME_OPERATOR'));
  const tx = await game.grantRole(ROLE, backendAddr);
  console.log('grantRole tx sent', tx.hash);
  await tx.wait();
  console.log('GAME_OPERATOR granted to', backendAddr);
}

main().catch((e) => { console.error(e); process.exit(1); });
