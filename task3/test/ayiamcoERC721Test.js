const { expect, assert } = require("chai");
const { commify } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

const Fixed_Token_Supply = 1000000;
const Token_Price = 0.001 * 10 ** 18; //At 1000 Token per Eth
let owner;
let holder;
let Ayiamco;
let ayiamcoToken;
let accounts;

describe("AyiamcoERC721 Contract", async () => {
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    [owner, holder] = accounts;
    Ayiamco = await ethers.getContractFactory("AyiamcoERC721");
    ayiamcoToken = await Ayiamco.deploy("AyiamcoERC721", "AYC");
    await ayiamcoToken.deployed();
  });

  it("Should mint token to correct address.", async function () {
    const tokedIdOfMintedToken1 = 1;
    const tokedIdOfMintedToken2 = 2;

    let mintTxn = await ayiamcoToken.mintToken("http://dummy.com/test.png", "dummy description");
    await mintTxn.wait();
    let mintedTokenOwner1 = await ayiamcoToken.ownerOf(tokedIdOfMintedToken1);
    mintTxn = await ayiamcoToken.connect(holder).mintToken("http://dummy.com/test.png", "dummy description");
    await mintTxn.wait();
    let mintedTokenOwner2 = await ayiamcoToken.ownerOf(tokedIdOfMintedToken2);

    expect(mintedTokenOwner1).to.equal(owner.address);
    expect(mintedTokenOwner2).to.equal(holder.address);
  });

  it("Should update buyer balance.", async function () {
    const tokensMintedForOwner = 1;

    let mintTxn = await ayiamcoToken.mintToken("http://dummy.com/test.png", "dummy description");
    await mintTxn.wait();
    let balanceOfOwner = await ayiamcoToken.balanceOf(owner.address);

    expect(tokensMintedForOwner).to.equal(balanceOfOwner);
  });

  it("Should Increment tokenId.", async function () {
    const expectedCurrentTokenId = 3; //After to tokens have been minted

    let mintTxn = await ayiamcoToken.mintToken("http://dummy.com/test.png", "dummy description");
    await mintTxn.wait();
    mintTxn = await ayiamcoToken.mintToken("http://dummy.com/test.png", "dummy description");
    await mintTxn.wait();

    let actualCurrentTokenId = await ayiamcoToken.getCurrentTokenId();

    expect(expectedCurrentTokenId).to.equal(actualCurrentTokenId);
  });
});
