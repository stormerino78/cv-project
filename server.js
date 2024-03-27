const express = require('express');
const {updateCVData} = require('./scripts/updateCVData.js'); //import updateCVData method
const {retrieveCVData} = require('./scripts/retrieveCVData.js'); //import fetchDataFromIPFS method

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to retrieve CV data
app.get('/retrieveCV/:userAddress', async (req, res) => {
    const { userAddress } = req.params;
    const contractAddress = "0x0648225A73b2130A37e3f4684D868783537dF9f5";
    try {
        const cvData = await retrieveCVData(userAddress, contractAddress);
        res.json({ success: true, cvData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to submit/update CV data
app.post('/updateCV', async (req, res) => {
    const cvData = req.body; // Assuming cvData is sent as JSON in the request body
    const contractAddress = "0x0648225A73b2130A37e3f4684D868783537dF9f5";
    try {
        const updateResult = await updateCVData(cvData, contractAddress);
        res.json({ success: true, updateResult });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
