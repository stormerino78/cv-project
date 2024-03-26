const {deployDigitalCV} = require('./scripts/deployDigitalCV.js'); //import deployDigitalCV method
const {uploadToIPFS} = require('./scripts/uploadCVtoIPFS.js'); //import uploadToIPFS method
const {updateCVData} = require('./scripts/updateCVData.js'); //import updateCVData method

function watchForChanges(contractAddress, hashIndex) {
    // we watch any modification that happen in the CV-data folder
    const chokidar = require('chokidar');
    // Specify the path to the folder or file to watch
    const watchPath = './scripts/CV-data/';
    // Initialize the watcher
    const watcher = chokidar.watch(watchPath, { ignored: /^\./, persistent: true });
    watcher
    .on('add', path => updateCVData(path, contractAddress, hashIndex+1)) // when adding a new cv, we increment the index to not replace the existing CV
    .on('change', path => updateCVData(path, contractAddress, hashIndex))
    .on('error', error => console.error(`Watcher error: ${error}`))
    .on('ready', () => console.log('Initial scan complete. Ready for changes'));
    console.log(`Watching for file changes in ${watchPath}`);
}

async function initialProcess() {
    hashIndex = 0; // set the index at 0 since no CV is yet stored
    const ipfsFilePath = './scripts/CV-data/uploadToIPFS.jpg'; // Path to the file you want to upload
    const ipfsHash = await uploadToIPFS(ipfsFilePath);
    console.log("Uploaded to IPFS with hash:", ipfsHash);
    const contractAddress = await deployDigitalCV(hashIndex, ipfsHash);
    console.log("Smart-contract successfully deployed with the CV data to:", contractAddress);
    return {contractAddress, hashIndex};
}

async function main(){
    const {contractAddress, hashIndex} = await initialProcess();
    watchForChanges(contractAddress, hashIndex);
}

main()
    .catch(error => {
        console.error(error);
        process.exit(1);
    });