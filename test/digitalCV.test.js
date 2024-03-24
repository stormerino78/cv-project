const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("digitalCV", function () {
  let DigitalCV;
  let digitalCV;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    DigitalCV = await ethers.getContractFactory("digitalCV");
    [owner, addr1, addr2, _] = await ethers.getSigners();

    // Deploy the contract and await for it to be deployed (transaction to be mined).
    digitalCV = await DigitalCV.deploy();
    // No need to call .deployed() as await DigitalCV.deploy() already waits for it to be deployed.
    });

  // Test case for updating and retrieving CV for the contract owner
  describe("CV management", function () {
    it("Should allow a user to update and retrieve their CV", async function () {
      // Call the updateCV function
      await digitalCV.connect(addr1).updateCV("John Doe", "Software Engineer", "john@example.com", "Hello I love pancakes", "My work experience", "My education", "My skills");

      // Call the getCV function
      const retrievedCV = await digitalCV.getCV(addr1.address);

      // Validate the CV details
      expect(retrievedCV.name).to.equal("John Doe");
      expect(retrievedCV.job).to.equal("Software Engineer");
      expect(retrievedCV.email).to.equal("john@example.com");
      expect(retrievedCV.bio).to.equal("Hello I love pancakes");
      expect(retrievedCV.workExperience).to.equal("My work experience");
      expect(retrievedCV.education).to.equal("My education");
      expect(retrievedCV.skills).to.equal("My skills");
    });

    it("Should emit an event when CV is updated", async function () {
      // Expect the updateCV to emit an event with the correct details
      await expect(digitalCV.connect(addr1).updateCV("Jane Doe", "Graphic Designer", "jane@example.com", "Hello I love pancakes", "Jane's work experience", "Jane's education", "Jane's skills"))
        .to.emit(digitalCV, "CVUpdated")
        .withArgs(addr1.address, "Jane Doe", "Graphic Designer", "jane@example.com", "Hello I love pancakes", "Jane's work experience", "Jane's education", "Jane's skills");
    });
  });
});
