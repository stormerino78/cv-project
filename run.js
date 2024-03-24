const {deployDigitalCV} = require('./scripts/deployDigitalCV.js'); //import deployDigitalCV method
const {uploadToIPFS} = require('./scripts/uploadCVtoIPFS.js'); //import uploadToIPFS method

async function main() {
    const ipfsFilePath = './scripts/uploadToIPFS.jpg'; // Path to the file you want to upload
    const ipfsHash = await uploadToIPFS(ipfsFilePath);
    console.log("Uploaded to IPFS with hash:", ipfsHash);
    const contractAddress = await deployDigitalCV(ipfsHash);
    console.log("Smart-contract deployed to:", contractAddress);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }); 