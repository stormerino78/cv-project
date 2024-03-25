const fs = require('fs');
const path = require('path');

//Get the ABI of the current contract
const artifactPath = path.join(__dirname, '../artifacts/contracts/digitalCV.sol/digitalCV.json'); // path to the artifact file of the contract
// Load the JSON data from the artifact file
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
// Extract the ABI from the artifact
const contractABI = artifact.abi;

async function updateSmartContract(contractAddress, ipfsHash, hashIndex) {
  const [signer] = await ethers.getSigners(); // get the person who will execute the transaction (here the private key referenced in the hardhat environment)
  const contract = new ethers.Contract(contractAddress, contractABI, signer); // `signer` should be connected to your wallet
  const tx = await contract.updateCVHash(hashIndex, ipfsHash); //hashIndex correspond to the CV the user wants to modify (if he has several)
  await tx.wait(); // Wait for the transaction to be mined
  console.log(`The hash in smart contract ${contractAddress} has been updated`);
}

exports.updateSmartContract = updateSmartContract;