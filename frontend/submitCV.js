const { uploadToIPFS } = require("../scripts/uploadCVtoIPFS");

async function submitCV() {
    const cvData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        job: document.getElementById('job').value,
        bio: document.getElementById('bio').value
        // Include other fields accordingly
    };

    //send the data to the API
    fetch('http://localhost:3000/uploadCV', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cvData), // Convert cvData to a JSON string
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });

    // Convert cvData to a JSON string
    const jsonData = JSON.stringify(cvData);
    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], {type: "application/json"});
    // Optionally, convert the Blob to a File
    const file = new File([blob], "cvData.json", {type: "application/json"});

    console.log(jsonData);
    console.log(file);

    //uploadToIPFS(file) //sending the data to the IPFS
}
