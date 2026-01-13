# AGIS Contracts (Hardhat)

This folder contains the AGIS smart contract suite built with Hardhat and OpenZeppelin upgradeable contracts.

Contracts:
- `AGISX.sol` — ERC20 upgradeable token with `MINTER_ROLE`.
- `FeeRouter.sol` — routes fees to creator, rewards, and treasury.
- `RewardsPool.sol` — lock-based rewards pool (admin deposits for users).
- `GameEngine.sol` — tracks XP and mission rewards.

Quick start:

```bash
cd contracts
npm install
npx hardhat compile
# run deploy script against local network
npx hardhat node &
npm run deploy
```

Notes:
- Contracts are placed in `contracts_src/` to keep the repo organized.
- This is a minimal scaffold; extend logic and add tests before production use.
# AGIS Contracts

Hardhat project with upgradeable OpenZeppelin-based contracts.

Quick start:

```bash
cd contracts
npm install
npx hardhat compile
```
