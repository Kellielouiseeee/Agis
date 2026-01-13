// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract GameEngine is Initializable, AccessControlUpgradeable {
    bytes32 public constant GAME_MASTER = keccak256("GAME_MASTER");

    struct Player { uint256 xp; uint256 lastActive; }
    mapping(address => Player) public players;

    function initialize(address admin) public initializer {
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function awardXP(address player, uint256 xp) external onlyRole(GAME_MASTER) {
        players[player].xp += xp;
        players[player].lastActive = block.timestamp;
        emit XPAwarded(player, xp, players[player].xp);
    }

    function getXP(address player) external view returns (uint256) { return players[player].xp; }

    event XPAwarded(address indexed player, uint256 xp, uint256 totalXp);
}
