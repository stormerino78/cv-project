// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function deployDigitalCV(ipfsHash = '00000000000000000000') {

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the ContractFactory for the digitalCV contract 
    const digitalCV = await ethers.getContractFactory("digitalCV");
    // Deploy the contract
    console.log("Deploying digitalCV contract...");
    const deployedDigitalCV = await digitalCV.deploy();
    console.log("Contract successfully deployed to ",deployedDigitalCV.target);
    //Update the smart contract with the cv data
    console.log("Updating CV hash in the contract...");
    const updateTx = await deployedDigitalCV.updateCVHash(ipfsHash);
    await updateTx.wait(); // Wait for the transaction to be mined

    return deployedDigitalCV.target;
}

exports.deployDigitalCV = deployDigitalCV; //export it as uploadToIPFS to use it in the run.js

/* test purposes
deployDigitalCV()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
*/

/* Converter String -> Bytes32
ipfsHash_bytes32 = convertStringtoBytes32(ipfsHash)
async function convertStringtoBytes32(string) {
    const bytes32 = ethers.encodeBytes32String(string);
    console.log("byte object : ",bytes32);
    const string_back = ethers.decodeBytes32String(bytes32);
    console.log("string object : ",string_back);
    return bytes32; // throw an error if the string is longer than 31bytes
}
*/