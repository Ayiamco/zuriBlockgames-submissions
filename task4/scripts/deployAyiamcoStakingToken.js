//Script to deploy contract
const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log(deployer.address, " is Deploying AyiamcoStakingTokenContract...");
  console.log(deployer.address, " Account balance: ", accountBalance.toString());

  const ayiamcoStakingTokenContractFactory = await hre.ethers.getContractFactory("AyiamcoStakingToken");
  const ayiamcoStakingTokenContract = await ayiamcoStakingTokenContractFactory.deploy();
  await ayiamcoStakingTokenContract.deployed();

  let contractBalance = await hre.ethers.provider.getBalance(ayiamcoStakingTokenContract.address);
  console.log("ayiamcoStakingTokenContract balance:", hre.ethers.utils.formatEther(contractBalance));

  console.log("ayiamcoStakingTokenContract address: ", ayiamcoStakingTokenContract.address);
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
