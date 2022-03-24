const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const Fixed_Token_Supply = 1000000;
const Token_Price = 0.001 * 10 ** 18; //At 1000 Token per Eth
const AMT_ASSIGNED_TO_OWNER = 1000;
let owner;
let Ayiamco;
let ayiamcoToken;
let accounts;

describe("AyiamcoStakingToken Contract", async () => {
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    Ayiamco = await ethers.getContractFactory("AyiamcoStakingToken");
    ayiamcoToken = await Ayiamco.deploy();
    await ayiamcoToken.deployed();
  });

  it("Should get users balance", async function () {
    let ownersTokenBal = await ayiamcoToken.balanceOf(owner.address);
    expect(Number(ownersTokenBal)).to.equal(AMT_ASSIGNED_TO_OWNER);
  });

  //   it("Should assign token price", async function () {
  //     let tokenPrice = await ayiamcoToken.getTokenEthPrice();

  //     expect(Token_Price).to.equal(tokenPrice);
  //   });

  //   it("Should transfer amount paid for token to contract.", async () => {
  //     let amtPaid = "10";
  //     let receiver = accounts[1];

  //     let txn = await ayiamcoToken.buyToken(receiver.address, {
  //       value: ethers.utils.parseEther(amtPaid),
  //     });
  //     await txn.wait();
  //     let contractEthBalAfterTxn = await ethers.provider.getBalance(ayiamcoToken.address);

  //     expect(parseInt(ethers.utils.formatEther(contractEthBalAfterTxn))).equals(parseInt(amtPaid));
  //   });

  //   it("Should assign correct number of tokens to receiver.", async () => {
  //     const amtPaidInEther = "1";
  //     const tokenBought = 1000; //At 1000 Tokens per ETH
  //     let receiver = accounts[1];

  //     let txn = await ayiamcoToken.buyToken(receiver.address, {
  //       value: ethers.utils.parseEther(amtPaidInEther),
  //     });
  //     await txn.wait();

  //     let receiverTokenBalance = await ayiamcoToken.balanceOf(receiver.address);
  //     expect(tokenBought).equals(receiverTokenBalance);
  //   });

  //   it("Should not mint more tokens than fixed supply.", async () => {
  //     const amtPaidInEther = "3000";
  //     let receiver = accounts[1];

  //     let txn = await ayiamcoToken.buyToken(receiver.address, {
  //       value: ethers.utils.parseEther(amtPaidInEther),
  //     });
  //     await txn.wait();
  //     let receiverTokenBalance = await ayiamcoToken.balanceOf(receiver.address);

  //     expect(Fixed_Token_Supply).equals(receiverTokenBalance);
  //     try {
  //       await ayiamcoToken.buyToken(receiver.address, {
  //         value: ethers.utils.parseEther("10"),
  //       });
  //       expect(2).equals(3);
  //     } catch (e) {}
  //   });

  //   it("Should send back excess ether sent by token buyer.", async () => {
  //     const amtPaidInEther = "1700";
  //     let receiver = accounts[1];
  //     let ownerEthBalBeforeTxn = await ethers.provider.getBalance(owner.address);

  //     let txn = await ayiamcoToken.buyToken(receiver.address, {
  //       value: ethers.utils.parseEther(amtPaidInEther),
  //     });
  //     await txn.wait();
  //     let ownerEthBalAfterTxn = await ethers.provider.getBalance(owner.address);
  //     let amtDeductedFromOwner = (parseInt(ownerEthBalBeforeTxn) - parseInt(ownerEthBalAfterTxn)) / 10 ** 18;

  //     expect(amtDeductedFromOwner).lessThan(parseInt(amtPaidInEther));
  //   });
});
