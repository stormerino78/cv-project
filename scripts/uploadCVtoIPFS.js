//requirements
require('dotenv').config({ path: '.env' }); // adjust the path to get the variable from the .env file in the parent directory (.env or ../.env)
const axios = require('axios');
const {PINATA_API_KEY} = process.env; //get Pinata api key from .env file

async function uploadToIPFS(data) {
    /* data form:
    {name: 'hello', email: 'hello.hi@hello.fr', job: 'zaczc', bio: 'zac'}*/ 
    const config = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${PINATA_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', config);
        const responseData = await response.json();
        if(response.ok) {
            console.log(responseData.IpfsHash);
            return responseData.IpfsHash; //Returns the hash of the data stored in the IPFS
        }else {
            //throw an error
            console.error("Failed to pin data to IPFS:", responseData.error);
            throw new Error(responseData.error);
        }
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
    }
}

//export it as uploadToIPFS to use it in the run.js
exports.uploadToIPFS = uploadToIPFS;




/* Test options
// Connection Test to pinata API
    
    const config = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${PINATA_API_KEY}`
        }
    };
    fetch('https://api.pinata.cloud/data/testAuthentication', config)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

// upload a CV file to IPFS command (test purposes)
// uploadToIPFS('./uploadToIPFS.jpg').then(ipfsHash => console.log("CV uploaded to IPFS with hash:", ipfsHash));

*/


