const express = require('express');
const {uploadToIPFS} = require('./scripts/uploadCVtoIPFS.js'); //import updateCVData method
const {fetchDataFromIPFS} = require('./scripts/fetchDataFromIPFS.js'); //import fetchDataFromIPFS method

const app = express();
const cors = require('cors'); // Import CORS package
const port = 3000;
const contractAddress = "0x0648225A73b2130A37e3f4684D868783537dF9f5";

// only allow requests from the frontend application in the CORS policy
app.use(cors({ origin: 'http://localhost:8080' })); 
// api setup
app.use(express.json());

// Endpoint to fetch data from IPFS for multiple hashes
app.post('/fetchDataFromIPFS', async (req, res) => {
    const { ipfsHashes } = req.body; // hashes are sent as an array of strings
    console.log("IPFS HASHES:", ipfsHashes);
    //IPFS HASHES: ['QmbjJSe58sLC19gXyi3U8wrbLwF4XTG8pWx2tWsi9MXn7E','QmZdopXBYBFhoCnkxoBvGV4px1hbrRYTqBHkT76yaGNXoM']
    try {
        // Map each hash to a promise that calls fetchDataFromIPFS and handle them all at once
        const dataPromises = ipfsHashes.map(hash => fetchDataFromIPFS(hash)); //Associate each Hash with the corresponding data
        const data = await Promise.all(dataPromises);
        res.json(data); // Send the array of data back to the client
    } catch (error) {
        console.error('Failed to fetch data from IPFS:', error);
        res.status(500).send('Failed to fetch data from IPFS');
    }
});

// Endpoint to submit/update CV data
app.post('/updateCV', async (req, res) => {
    const cvData = req.body; // Assuming cvData is sent as JSON in the request body
    try {
        console.log('contractAddress', contractAddress);
        const IpfsHash = await uploadToIPFS(cvData, contractAddress);
        res.json({ success: true, ipfsHash : IpfsHash });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
