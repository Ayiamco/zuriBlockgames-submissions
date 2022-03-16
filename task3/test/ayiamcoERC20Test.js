import { expect } from "chai";
import { ethers } from "hardhat";

const INITIAL_SUPPLY = 1000000;
let owner;
let Ayiamco;
let ayiamcoToken;
let accounts;

describe("Ayiamco Contract", async () => {
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    Ayiamco = await ethers.getContractFactory("Ayiamco");
    ayiamcoToken = await Ayiamco.deploy();
    await ayiamcoToken.deployed();
  });

  it("Should assign initial supply to deployer's address", async function () {
    let ownerBalance = await ayiamcoToken.balanceOf(owner.address);
    expect(ownerBalance).to.equal(INITIAL_SUPPLY);
  });

  it("Should transfer token cost to contract when buying token.", async () => {
    let tokenPurchaseAmt = "100";
    let receiver = accounts[1];
    let txn = await ayiamcoToken.buyToken(receiver.address, {
      value: ethers.utils.parseEther(tokenPurchaseAmt),
    });
    await txn.wait();

    let contractEthBalAfterTxn = await ethers.provider.getBalance(ayiamcoToken.address);

    expect(parseInt(ethers.utils.formatEther(contractEthBalAfterTxn))).equals(parseInt(tokenPurchaseAmt));
  });

  it("Should assign correct number of tokens to receiver.", async () => {
    const amtPaidInEther = "1";
    const tokenBought = 1000; //At 1000 Tokens per ETH
    let receiver = accounts[1];
    //console.log(await ayiamcoToken.balanceOf(owner.address));
    let txn = await ayiamcoToken.buyToken(receiver.address, {
      value: ethers.utils.parseEther(amtPaidInEther),
    });
    await txn.wait();

    let receiverTokenBalance = await ayiamcoToken.balanceOf(receiver.address);
    expect(tokenBought).equals(receiverTokenBalance);
  });

  it("Should maintain fixed total supply after token is bought", async () => {});
});
