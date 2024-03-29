//requirements
require('dotenv').config({ path: '.env' }); // adjust the path to get the variable from the .env file in the parent directory (.env or ../.env)
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const {PINATA_API_KEY} = process.env; //get INFURA api key from .env file

async function uploadToIPFS(data) {
    /* data form:
    {
    name: 'hello',
    email: 'hello.hi@hello.fr',
    job: 'zaczc',
    bio: 'zac'
    }*/

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`; // Pinata endpoint for file upload
    //create a new variable formData which will take the CV datas 
    const formData = new FormData();
    //Add our data in the formData variable
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
    }

    const config = { // Configure the request for Pinata
        method: 'post',
        url: url,
        headers: {
            'Authorization': `Bearer ${PINATA_API_KEY}`, // Use the Pinata API key for authorization
            ...formData.getHeaders() // important to include the form-data boundary
        },
        data: formData
    };
    try { //try-catch block to log errors 
        const response = await axios(config); // get the answser of Pinata (IPFS hash) following our POST request
        console.log("Data stored in IPFS")
        return response.data.IpfsHash; // Returns the IPFS hash of the uploaded file as a string
    } catch (error) {
        console.error("Failed to upload to IPFS:", error);
    }
}

exports.uploadToIPFS = uploadToIPFS; //export it as uploadToIPFS to use it in the run.js

// upload a CV file to IPFS command (test purposes)
// uploadToIPFS('./uploadToIPFS.jpg').then(ipfsHash => console.log("CV uploaded to IPFS with hash:", ipfsHash));

