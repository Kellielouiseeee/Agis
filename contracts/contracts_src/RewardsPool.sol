// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title RewardsPool
 * @notice Holds reward tokens and manages allocations and claims with on-chain invariants.
 */
contract RewardsPool is Initializable, AccessControlUpgradeable, PausableUpgradeable, UUPSUpgradeable {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    bytes32 public constant TREASURY_ROLE = keccak256("TREASURY_ROLE");
    bytes32 public constant REWARDS_OPERATOR_ROLE = keccak256("REWARDS_OPERATOR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    IERC20Upgradeable public rewardToken;

    // total allocated (not yet claimed)
    uint256 public totalAllocated;

    // per-user allocated balance
    mapping(address => uint256) public allocated;

    // per-user epoch limits
    uint256 public epochSeconds;
    mapping(address => uint256) public epochWindowStart;
    mapping(address => uint256) public epochWindowAllocated;
    uint256 public perEpochLimit; // max tokens per epoch per user

    event Allocated(address indexed to, uint256 amount, uint256 totalAllocated);
    event Claimed(address indexed who, uint256 amount);
    event Deposited(address indexed from, uint256 amount);

    function initialize(address token_, address admin, uint256 _epochSeconds, uint256 _perEpochLimit) public initializer {
        __AccessControl_init();
        __Pausable_init();
        __UUPSUpgradeable_init();
        rewardToken = IERC20Upgradeable(token_);
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(GOVERNANCE_ROLE, admin);
        epochSeconds = _epochSeconds;
        perEpochLimit = _perEpochLimit;
        _setupRole(UPGRADER_ROLE, admin);
    }

    /**
     * @notice Deposit tokens into the pool. Caller must transfer tokens to this contract before calling.
     */
    function deposit(uint256 amount) external onlyRole(TREASURY_ROLE) whenNotPaused {
        require(amount > 0, "amount>0");
        // expects treasury has approved this contract
        require(rewardToken.transferFrom(msg.sender, address(this), amount), "transferFrom failed");
        emit Deposited(msg.sender, amount);
    }

    /**
     * @notice Allocate rewards to a user (scheduled/queued). Only REWARDS_OPERATOR_ROLE allowed.
     */
    function allocateRewards(address to, uint256 amount) external onlyRole(REWARDS_OPERATOR_ROLE) whenNotPaused {
        require(amount > 0, "amount>0");
        // enforce pool balance invariant
        require(totalAllocated + amount <= rewardToken.balanceOf(address(this)), "insufficient pool balance");

        // enforce per-epoch limit
        _enforceEpochLimit(to, amount);

        allocated[to] += amount;
        totalAllocated += amount;
        emit Allocated(to, amount, totalAllocated);
    }

    function _enforceEpochLimit(address who, uint256 amount) internal {
        if (epochSeconds == 0 || perEpochLimit == 0) return;
        uint256 start = epochWindowStart[who];
        if (block.timestamp >= start + epochSeconds) {
            epochWindowStart[who] = block.timestamp;
            epochWindowAllocated[who] = 0;
        }
        require(epochWindowAllocated[who] + amount <= perEpochLimit, "epoch limit exceeded");
        epochWindowAllocated[who] += amount;
    }

    /**
     * @notice Claim allocated rewards. Transfers tokens to caller and reduces allocated balance.
     */
    function claimRewards() external whenNotPaused {
        uint256 amt = allocated[msg.sender];
        require(amt > 0, "no rewards");
        allocated[msg.sender] = 0;
        totalAllocated -= amt;
        require(rewardToken.transfer(msg.sender, amt), "transfer failed");
        emit Claimed(msg.sender, amt);
    }

    function setEpochParams(uint256 _epochSeconds, uint256 _perEpochLimit) external onlyRole(GOVERNANCE_ROLE) {
        // governance only
        epochSeconds = _epochSeconds;
        perEpochLimit = _perEpochLimit;
    }

    function pause() external onlyRole(GOVERNANCE_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(GOVERNANCE_ROLE) {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
