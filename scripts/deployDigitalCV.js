// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the ContractFactory for the digitalCV contract 
    const digitalCV = await ethers.getContractFactory("digitalCV");
    // Deploy the contract
    console.log("Deploying digitalCV contract...");
    const deployedDigitalCV = await digitalCV.deploy();
    
    console.log("digitalCV deployed to:", deployedDigitalCV.target); //Get the contract address displayed as the target element of deployedDigitalCV Base contract (instead of address normally)
}

// pattern to be able to use async/await and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });