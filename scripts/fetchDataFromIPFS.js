// fetch the data in Node.js:
const fetch = require('node-fetch');
//or in a browser https://aqua-historic-buzzard-524.mypinata.cloud/ipfs/QmXo5KxVMxcjHze5vRq76uD4qD3LFgtwvWhaCssGh3B3qi

const url = `https://aqua-historic-buzzard-524.mypinata.cloud/ipfs/`; // IPFS Pinata gateway url

async function fetchDataFromIPFS(ipfsHash = "QmZdopXBYBFhoCnkxoBvGV4px1hbrRYTqBHkT76yaGNXoM") {
    try {
        const response = await fetch(url + ipfsHash); //get the data the Pinata gateway with the hash
        const data = await response.json(); // or `.json()` if you're expecting JSON data
        console.log(data);
    } catch (error) {
        console.error('Failed to fetch data from IPFS:', error);
    }
}

exports.fetchDataFromIPFS = fetchDataFromIPFS; //export it as uploadToIPFS to use it in the run.js

//testing purposes
//fetchDataFromIPFS();
