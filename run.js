const {deployDigitalCV} = require('./scripts/deployDigitalCV.js'); //import deployDigitalCV method
const {uploadToIPFS} = require('./scripts/uploadCVtoIPFS.js'); //import uploadToIPFS method
const {updateSmartContract} = require('./scripts/UpdateSmartContract.js'); // import updateSmartContract method

//function that will be called when the user updated its CV datas to update the IPFS and smart-contract
async function updateCVData(filePath, contractAddress) {
    try {
    // Upload the updated CV to IPFS
    const ipfsHash = await uploadToIPFS(filePath);
    console.log(`Updated CV uploaded to IPFS with hash: ${ipfsHash}`);

    // Update the IPFS hash in the smart contract
    await updateSmartContract(contractAddress, ipfsHash);
    console.log(`Smart contract at ${contractAddress} updated with new IPFS hash.`);
    } catch (error) {
        console.error('Error processing file change:', error);
    }
}
async function main() {
    const ipfsFilePath = './scripts/CV-data/uploadToIPFS.jpg'; // Path to the file you want to upload
    const ipfsHash = await uploadToIPFS(ipfsFilePath);
    console.log("Uploaded to IPFS with hash:", ipfsHash);
    const contractAddress = await deployDigitalCV(ipfsHash);
    console.log("Smart-contract deployed to:", contractAddress);

    // we watch any modification that happen in the CV-data folder
    const chokidar = require('chokidar');
    // Specify the path to the folder or file to watch
    const watchPath = './scripts/CV-data/';
    // Initialize the watcher
    const watcher = chokidar.watch(watchPath, { ignored: /^\./, persistent: true });
    console.log(`Watching for file changes in ${watchPath}`);
    watcher
    .on('add', path => updateCVData(path))
    .on('change', path => updateCVData(path))
    .on('error', error => console.error(`Watcher error: ${error}`))
    .on('ready', () => console.log('Initial scan complete. Ready for changes'));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }); 