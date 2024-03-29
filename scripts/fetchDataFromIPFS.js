// fetch the data in Node.js:
const axios = require('axios'); //compatible CommonJS and ES module (require and import)
require('dotenv').config({ path: '../.env' });
const {PINATA_GATEWAY_URL} = process.env; //get IPFS Pinata gateway url from .env file

async function fetchDataFromIPFS(ipfsHash = "QmZdopXBYBFhoCnkxoBvGV4px1hbrRYTqBHkT76yaGNXoM") {
    try {
        const response = await axios.get(`${PINATA_GATEWAY_URL}${ipfsHash}`); //get the data the Pinata gateway with the hash
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Failed to fetch data from IPFS:', error);
    }
}

exports.fetchDataFromIPFS = fetchDataFromIPFS; //export it as uploadToIPFS to use it in the run.js

//testing purposes
//fetchDataFromIPFS();
