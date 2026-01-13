// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract RewardsPool is Initializable, AccessControlUpgradeable {
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    struct Lock { uint256 amount; uint256 until; }
    mapping(address => Lock[]) public locks;

    function initialize(address admin) public initializer {
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function stakeFor(address user, uint256 amount, uint256 lockUntil) external onlyRole(MANAGER_ROLE) {
        locks[user].push(Lock(amount, lockUntil));
        emit Staked(user, amount, lockUntil);
    }

    function getLocked(address user) external view returns (Lock[] memory) {
        return locks[user];
    }

    event Staked(address indexed user, uint256 amount, uint256 lockUntil);
}
