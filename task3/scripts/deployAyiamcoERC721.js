//Script to deploy contract
const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(deployer.address, " is Deploying AyiamcoERC721Contract...");
  console.log(deployer.address, " Account balance: ", accountBalance.toString());

  const ayiamcoErc721ContractFactory = await hre.ethers.getContractFactory("AyiamcoERC721");
  const ayiamcoERC721Contract = await ayiamcoErc721ContractFactory.deploy();
  await ayiamcoERC721Contract.deployed();

  let contractBalance = await hre.ethers.provider.getBalance(ayiamcoERC721Contract.address);
  console.log("AyiamcoERC721Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  console.log("AyiamcoERC721Contract address: ", ayiamcoERC721Contract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
