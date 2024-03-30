// fetch the data in Node.js:
const axios = require('axios'); //compatible CommonJS and ES module (require and import)
require('dotenv').config({ path: '../.env' });
const {PINATA_GATEWAY_URL} = process.env; //get IPFS Pinata gateway url from .env file

async function fetchDataFromIPFS(ipfsHash) {
    try {
        //ERROR 'The owner of this gateway does not have this content pinned to their Pinata account. In order to view this content, please reach out to the owner. - ERR_ID:00006'
        const response = await axios.get(`${PINATA_GATEWAY_URL}${ipfsHash}`); //fetch the data the Pinata gateway with the hash
        return response.data; // take only the data from axios object
    } catch (error) {
        console.error('Failed to fetch data from IPFS:', error);
    }
}

exports.fetchDataFromIPFS = fetchDataFromIPFS; //export it as uploadToIPFS to use it in the run.js
