// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title GameEngine
 * @notice Stores player XP and accepts server-authorized game results. Designed to minimize on-chain trust.
 */
contract GameEngine is Initializable, AccessControlUpgradeable, PausableUpgradeable, UUPSUpgradeable {
    bytes32 public constant GAME_OPERATOR = keccak256("GAME_OPERATOR");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    struct Player {
        uint256 xp;
        uint256 earnedRewards;
        uint256 lastPlayedAt;
    }

    mapping(address => Player) public players;
    mapping(bytes32 => bool) public sessionProcessed; // session idempotency

    event GameResultRecorded(address indexed player, uint256 xp, uint256 reward, bytes32 sessionId, address operator);

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __Pausable_init();
        __UUPSUpgradeable_init();
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(GAME_OPERATOR, admin);
        _setupRole(UPGRADER_ROLE, admin);
    }

    /**
     * @notice Record a game result. Only callable by an on-chain whitelisted game operator (server-signer).
     * @param player player address
     * @param xp xp awarded
     * @param reward reward amount (informational; actual transfer handled by RewardsPool)
     * @param sessionId unique session identifier from server
     */
    function recordGameResult(address player, uint256 xp, uint256 reward, bytes32 sessionId) external onlyRole(GAME_OPERATOR) whenNotPaused {
        require(player != address(0), "invalid player");
        require(xp <= 1_000_000 * 1e18, "xp too large"); // arbitrary upper bound
        require(!sessionProcessed[sessionId], "session processed");

        // anti-abuse: minimal cooldown per player
        uint256 last = players[player].lastPlayedAt;
        require(block.timestamp >= last, "invalid timestamp");
        // update state
        players[player].xp += xp;
        players[player].earnedRewards += reward;
        players[player].lastPlayedAt = block.timestamp;
        sessionProcessed[sessionId] = true;

        emit GameResultRecorded(player, xp, reward, sessionId, msg.sender);
    }

    function getPlayer(address player) external view returns (uint256 xp, uint256 earnedRewards, uint256 lastPlayedAt) {
        Player storage p = players[player];
        return (p.xp, p.earnedRewards, p.lastPlayedAt);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
