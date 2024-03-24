require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); //setup the path of the .env file

const { PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  networks: {
    amoy: {
      hardhat: {},
      url: `https://polygon-amoy.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

