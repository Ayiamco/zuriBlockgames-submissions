//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AyiamcoERC20 is ERC20, Ownable {
    using SafeMath for uint256;

    uint256 private tokenPrice;
    uint256 private fixedSupply;
    mapping(address => uint256) internal stakes;
    address[] internal stakeholders;

    constructor() ERC20("AyiamcoStakingToken", "AYST") {
        fixedSupply = 1000000;
        tokenPrice = 1 ether / 1000; //token sold at 1000 Tokens per ETH
        _mint(msg.sender, 1000);
    }

    function buyToken(address receiver) public payable {
        uint256 totalSupply = totalSupply();
        require(fixedSupply > totalSupply, "Token fixed supply exhausted");

        uint256 amtPaid = msg.value;
        uint256 tokenLeftToBuy = fixedSupply - totalSupply;
        uint256 tokenAmtPaidCouldBuy = amtPaid / tokenPrice;

        if (tokenAmtPaidCouldBuy > tokenLeftToBuy) {
            _mint(receiver, tokenLeftToBuy);
            uint256 returnAmt = msg.value - tokenLeftToBuy * tokenPrice;
            address payable buyer = _make_payable(msg.sender);
            buyer.transfer(returnAmt);
        } else {
            _mint(receiver, tokenAmtPaidCouldBuy);
        }
    }

    function createStake(uint256 _stake) public {
        _burn(msg.sender, _stake);
        if (stakes[msg.sender] == 0) addStakeholder(msg.sender);
        stakes[msg.sender] = stakes[msg.sender].add(_stake);
    }

    function addStakeholder(address _stakeholder) public {
        (bool _isStakeholder, ) = isStakeholder(_stakeholder);
        if (!_isStakeholder) stakeholders.push(_stakeholder);
    }

    function isStakeholder(address _address)
        public
        view
        returns (bool, uint256)
    {
        for (uint256 s = 0; s < stakeholders.length; s += 1) {
            if (_address == stakeholders[s]) return (true, s);
        }
        return (false, 0);
    }

    function modifyTokenBuyPrice(uint256 price) public onlyOwner {
        tokenPrice = 1 ether / price; //token sold at 1000 Tokens per ETH
    }

    function getFixedTotalSupply() public view returns (uint256) {
        return fixedSupply;
    }

    function getTokenEthPrice() public view returns (uint256) {
        return tokenPrice;
    }

    function _make_payable(address x) internal pure returns (address payable) {
        return payable(x);
    }
}
