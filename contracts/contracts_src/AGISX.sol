// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title AGISX
 * @notice ERC20 token for AGIS ecosystem with capped supply and role-based minting.
 */
contract AGISX is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant REWARDS_MINTER_ROLE = keccak256("REWARDS_MINTER_ROLE");
    bytes32 public constant TREASURY_ROLE = keccak256("TREASURY_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    // immutable-ish cap set at initialize
    uint256 public cap;

    /**
     * @dev initialize with token name, symbol, cap and admin address
     */
    function initialize(string memory name_, string memory symbol_, uint256 cap_, address admin) public initializer {
        require(cap_ > 0, "cap>0");
        __ERC20_init(name_, symbol_);
        __ERC20Burnable_init();
        __Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        cap = cap_;

        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(UPGRADER_ROLE, admin);
    }

    /**
     * @notice Mint tokens to `to`. Only callable by addresses with REWARDS_MINTER_ROLE or TREASURY_ROLE.
     * @dev Enforces the cap. Minting by DEFAULT_ADMIN_ROLE should be done via governance timelock.
     */
    function mint(address to, uint256 amount) external onlyRole(REWARDS_MINTER_ROLE) {
        require(totalSupply() + amount <= cap, "cap exceeded");
        _mint(to, amount);
    }

    /**
     * @notice Mint from treasury role (separate role)
     */
    function mintFromTreasury(address to, uint256 amount) external onlyRole(TREASURY_ROLE) {
        require(totalSupply() + amount <= cap, "cap exceeded");
        _mint(to, amount);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override(ERC20Upgradeable) whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    /**
     * @dev UUPS upgrade authorization
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
