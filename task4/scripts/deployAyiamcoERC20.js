//Script to deploy contract
const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(deployer.address, " is Deploying AyiamcoERC20Contract...");
  console.log(deployer.address, " Account balance: ", accountBalance.toString());

  const ayiamcoErc20ContractFactory = await hre.ethers.getContractFactory("AyiamcoERC20");
  const ayiamcoERC20Contract = await ayiamcoErc20ContractFactory.deploy();
  await ayiamcoERC20Contract.deployed();

  let contractBalance = await hre.ethers.provider.getBalance(ayiamcoERC20Contract.address);
  console.log("AyiamcoERC20Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  console.log("AyiamcoERC20Contract address: ", ayiamcoERC20Contract.address);
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
