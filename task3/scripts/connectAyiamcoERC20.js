const main = async () => {
  const [connector] = await hre.ethers.getSigners();
  const accountBalance = await connector.getBalance();

  console.log(connector.address, " is connecting to AyiamcoERC20Contract...");
  console.log(connector.address, " Account balance: ", accountBalance.toString());

  const contractAddress = "0xC760533E368746eFF4D0a379b6208F44119169ed";
  const myContract = await hre.ethers.getContractAt("AyiamcoERC20", contractAddress);

  let myBalance = await myContract.balanceOf("0x321e8a5e9b4adfa80d76bae352283eac22dc2995");
  console.log("My current AyiamcoERC20Token Balance : ", parseInt(myBalance));
  await myContract.buyToken("0x321e8a5e9b4adfa80d76bae352283eac22dc2995", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  myBalance = await myContract.balanceOf("0x321e8a5e9b4adfa80d76bae352283eac22dc2995");
  console.log("My current AyiamcoERC20Token Balance : ", parseInt(myBalance));
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
