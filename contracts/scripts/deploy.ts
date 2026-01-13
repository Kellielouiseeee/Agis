import { ethers, upgrades } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with', deployer.address);

  const AGISX = await ethers.getContractFactory('AGISX');
  const agis = await upgrades.deployProxy(AGISX, ['AGIS Token', 'AGIS', deployer.address]);
  await agis.deployed();
  console.log('AGISX deployed to', agis.target ?? agis.address);

  const FeeRouter = await ethers.getContractFactory('FeeRouter');
  const feeRouter = await upgrades.deployProxy(FeeRouter, [deployer.address, deployer.address, deployer.address, deployer.address]);
  await feeRouter.deployed();
  console.log('FeeRouter deployed to', feeRouter.target ?? feeRouter.address);

  const RewardsPool = await ethers.getContractFactory('RewardsPool');
  const rewardsPool = await upgrades.deployProxy(RewardsPool, [agis.target ?? agis.address, deployer.address]);
  await rewardsPool.deployed();
  console.log('RewardsPool deployed to', rewardsPool.target ?? rewardsPool.address);

  const GameEngine = await ethers.getContractFactory('GameEngine');
  const gameEngine = await upgrades.deployProxy(GameEngine, [deployer.address]);
  await gameEngine.deployed();
  console.log('GameEngine deployed to', gameEngine.target ?? gameEngine.address);
}

main().catch((e) => { console.error(e); process.exit(1); });
