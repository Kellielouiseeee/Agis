import { ethers } from 'hardhat';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with', deployer.address);

  // Deploy AGISX implementation and call initialize
  const AGISX = await ethers.getContractFactory('AGISX');
  const agis = await AGISX.deploy();
  await agis.deployed();
  console.log('AGISX implementation deployed to', agis.address);
  try {
    await (await agis.initialize(deployer.address)).wait();
    console.log('AGISX initialized');
  } catch (e) {
    console.warn('AGISX initialize failed (maybe already initialized)', e);
  }

  const FeeRouter = await ethers.getContractFactory('FeeRouter');
  const feeRouter = await FeeRouter.deploy();
  await feeRouter.deployed();
  console.log('FeeRouter deployed to', feeRouter.address);
  try { await (await feeRouter.initialize(deployer.address, deployer.address, deployer.address, deployer.address)).wait(); } catch {}

  const RewardsPool = await ethers.getContractFactory('RewardsPool');
  const rewardsPool = await RewardsPool.deploy();
  await rewardsPool.deployed();
  console.log('RewardsPool deployed to', rewardsPool.address);
  try { await (await rewardsPool.initialize(agis.address, deployer.address)).wait(); } catch {}

  const GameEngine = await ethers.getContractFactory('GameEngine');
  const gameEngine = await GameEngine.deploy();
  await gameEngine.deployed();
  console.log('GameEngine deployed to', gameEngine.address);
  try { await (await gameEngine.initialize(deployer.address)).wait(); } catch {}

  console.log('Deployment complete. Set these addresses in your backend env:');
  console.log(`AGISX_ADDRESS=${agis.address}`);
  console.log(`FEE_ROUTER_ADDRESS=${feeRouter.address}`);
  console.log(`REWARDS_POOL_ADDRESS=${rewardsPool.address}`);
  console.log(`GAME_ENGINE_ADDRESS=${gameEngine.address}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
