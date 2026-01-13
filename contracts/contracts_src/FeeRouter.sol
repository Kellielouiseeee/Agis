// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title FeeRouter
 * @notice Routes fees to configured sinks with bounded percentages.
 */
contract FeeRouter is Initializable, AccessControlUpgradeable, PausableUpgradeable, UUPSUpgradeable {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    address public creator;
    address public rewards;
    address public treasury;

    // percentages in basis points (parts per 10k)
    uint16 public creatorBps;
    uint16 public rewardsBps;
    uint16 public treasuryBps;

    event FeeRouted(address indexed from, uint256 amount);
    event FeeParamsUpdated(uint16 creatorBps, uint16 rewardsBps, uint16 treasuryBps);

    function initialize(address _creator, address _rewards, address _treasury, uint16 _creatorBps, uint16 _rewardsBps, address admin) public initializer {
        __AccessControl_init();
        __Pausable_init();
        __UUPSUpgradeable_init();
        creator = _creator;
        rewards = _rewards;
        treasury = _treasury;
        creatorBps = _creatorBps;
        rewardsBps = _rewardsBps;
        treasuryBps = uint16(10000 - _creatorBps - _rewardsBps);
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(GOVERNANCE_ROLE, admin);
        _setupRole(UPGRADER_ROLE, admin);
    }

    function setFeeParams(uint16 _creatorBps, uint16 _rewardsBps) external onlyRole(GOVERNANCE_ROLE) whenNotPaused {
        require(_creatorBps + _rewardsBps <= 10000, "bps overflow");
        creatorBps = _creatorBps;
        rewardsBps = _rewardsBps;
        treasuryBps = uint16(10000 - _creatorBps - _rewardsBps);
        emit FeeParamsUpdated(creatorBps, rewardsBps, treasuryBps);
    }

    function setAddresses(address _creator, address _rewards, address _treasury) external onlyRole(GOVERNANCE_ROLE) {
        creator = _creator; rewards = _rewards; treasury = _treasury;
    }

    function routeFee() external payable whenNotPaused {
        require(msg.value > 0, "no fee");
        uint256 total = msg.value;
        uint256 toCreator = (total * creatorBps) / 10000;
        uint256 toRewards = (total * rewardsBps) / 10000;
        uint256 toTreasury = total - toCreator - toRewards;
        if (toCreator > 0 && creator != address(0)) payable(creator).transfer(toCreator);
        if (toRewards > 0 && rewards != address(0)) payable(rewards).transfer(toRewards);
        if (toTreasury > 0 && treasury != address(0)) payable(treasury).transfer(toTreasury);
        emit FeeRouted(msg.sender, msg.value);
    }

    function pause() external onlyRole(GOVERNANCE_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(GOVERNANCE_ROLE) {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
