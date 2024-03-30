//const { uploadToIPFS } = require('../scripts/uploadCVtoIPFS.js');
//const { connectMetaMask } = require('./connectMetamask.js');

async function submitCV() { //POST method
    const cvData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        job: document.getElementById('job').value,
        bio: document.getElementById('bio').value,
    };
    try {
        // Assuming you have an endpoint set up to accept CV data and upload it to IPFS
        const response = await fetch('http://localhost:3000/updateCV', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cvData),
        });
        const result = await response.json();
        console.log('post method is', result)
        if (result.success) {
            return result.ipfsHash;
        }else{
            console.error('Upload failed:', result.message);
        }
        // Display success message or handle the IPFS hash as needed
    } catch (error) {
        console.error('Failed to submit CV:', error);
    }
}

async function getCVData() {
    fetch(`/retrieveCV/${userAddress[0]}`)
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                console.log(data.cvData);
                // Process and display CV data as needed
            } else {
                console.error(data.message);
            }
        })
        .catch((error) => console.error('Error fetching CV data:', error));
}