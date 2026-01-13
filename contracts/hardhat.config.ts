import { HardhatUserConfig } from 'hardhat/config';
// Note: avoid requiring hardhat-toolbox in this environment to keep dev dependency footprint small.
// If you need the full toolbox locally, install `@nomicfoundation/hardhat-toolbox` and related plugins.

// try to load OpenZeppelin upgrades plugin if installed; keep optional so compile still works
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('@openzeppelin/hardhat-upgrades');
} catch (e) {
  // plugin not installed in this environment — that's fine for compilation
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: '0.8.20', settings: { optimizer: { enabled: true, runs: 200 } } }
    ]
  },
  networks: {
    testnet: {
      url: process.env.RPC_URL || 'http://127.0.0.1:8545',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [] ,
      chainId: process.env.EXPECTED_CHAIN_ID ? Number(process.env.EXPECTED_CHAIN_ID) : undefined
    }
  },
  paths: {
    // sources are kept in contracts_src to preserve merged content
    sources: 'contracts_src',
    tests: 'test',
    cache: 'cache',
    artifacts: 'artifacts'
  },
  mocha: {
    timeout: 200000
  }
};

export default config;
