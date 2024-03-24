// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function deployDigitalCV(ipfsHash = '000000000000000000004') {

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the ContractFactory for the digitalCV contract 
    const digitalCV = await ethers.getContractFactory("digitalCV");
    // Deploy the contract
    console.log("Deploying digitalCV contract...");

    ipfsHash_bytes32 = convertStringtoBytes32(ipfsHash)
    //deploying the smart-contract with the IPFS hash
    const deployedDigitalCV = await digitalCV.deploy();
    //test
    console.log(deployedDigitalCV)
    console.log("Contract successfully deployed to ",deployedDigitalCV.target);
    return deployedDigitalCV.target;
}

async function convertStringtoBytes32(string) {
    const bytes32 = ethers.encodeBytes32String(string);
    console.log("byte object : ",bytes32);
    const string_back = ethers.decodeBytes32String(bytes32);
    console.log("string object : ",string_back);
    return bytes32; // throw an error if the string is longer than 31bytes
}

exports.deployDigitalCV = deployDigitalCV; //export it as uploadToIPFS to use it in the run.js

/* test purposes*/
deployDigitalCV()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
