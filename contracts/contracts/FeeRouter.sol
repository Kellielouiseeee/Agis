// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract FeeRouter is Initializable, AccessControlUpgradeable {
    bytes32 public constant TREASURY_ROLE = keccak256("TREASURY_ROLE");
    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");

    address public treasury;
    address public rewardsPool;

    function initialize(address admin, address _treasury, address _rewardsPool) public initializer {
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        treasury = _treasury;
        rewardsPool = _rewardsPool;
    }

    function routeFees(uint256 amount) external {
        // Minimal example: route 50% to treasury, 50% to rewards
        uint256 half = amount / 2;
        // In practice this would transfer tokens; keep modular for upgrade.
        emit Routed(amount, treasury, rewardsPool, half, amount - half);
    }

    event Routed(uint256 total, address treasury, address rewardsPool, uint256 treasuryAmt, uint256 rewardsAmt);
}
