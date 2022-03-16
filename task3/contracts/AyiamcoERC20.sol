//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AyiamcoERC20 is ERC20 {
    uint256 private tokenPrice;
    uint256 private fixedSupply;

    constructor() ERC20("AyiamcoERC20", "AYC") {
        fixedSupply = 1000000;
        tokenPrice = 1 ether / 1000; //token sold at 1000 Tokens per ETH
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
