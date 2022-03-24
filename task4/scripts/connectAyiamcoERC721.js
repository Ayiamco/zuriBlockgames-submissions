//Script to connect to deployed contract and send in transactions

const main = async () => {
  const [connector] = await hre.ethers.getSigners();
  const accountBalance = await connector.getBalance();

  console.log(connector.address, " is connecting to AyiamcoERC721Contract...");
  console.log(connector.address, " Account balance: ", accountBalance.toString());

  const contractAddress = "0x7456c1959aeC765B254387566Dd8d03fC3dEFe65";
  const myContract = await hre.ethers.getContractAt("AyiamcoERC721", contractAddress);

  let myBalance = await myContract.balanceOf("0x321e8a5e9b4adfa80d76bae352283eac22dc2995");
  console.log("My current AyiamcoERC721Token Balance : ", parseInt(myBalance));
  await myContract.mintAyiamcoNFT("https://jsonkeeper.com/b/WDGF");
  myBalance = await myContract.balanceOf("0x321e8a5e9b4adfa80d76bae352283eac22dc2995");
  console.log("My current AyiamcoERC721Token Balance : ", parseInt(myBalance));
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
