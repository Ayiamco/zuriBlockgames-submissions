const fs = require("fs/promises");

async function updateClientContract() {
  try {
    await fs.copyFile(
      "artifacts/contracts/AyiamcoStakingToken.sol/AyiamcoStakingToken.json",
      "app-clients/src/utils/ayiamcoStakingToken.json"
    );
    console.log("Solidity contracts was successfully copied to app-client.");
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

updateClientContract();
