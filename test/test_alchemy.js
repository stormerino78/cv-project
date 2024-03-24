const { Alchemy } = require("alchemy-sdk");


const alchemy = new Alchemy();

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();