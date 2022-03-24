# Basic Sample Hardhat Project

The project is UI/Frontend that interacts with a staking/vesting contract deployed on the rinkeby test network. The app-client folder contains the UI that commuinicates with the smart contracts. The project was built using [hardhat](https://hardhat.org/) and [react](https://reactjs.org/)

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deployAyiamcoERC20.js
npx hardhat help
```

#To run the deploy script

- Create a .env file in the root directory
- Add the following variables ALCHEMY_URL="Your Alchemy Url or some other node provider like Infura" ACCOUNT="Your account private key"
