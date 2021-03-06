const FundraiserContract = artifacts.require("Fundraiser")

contract("Fundraiser", (accounts) => {
  let fundraiser
  const name = "Beneficiary Name"
  const url = "beneficiaryname.org"
  const imageURL = "https://placekitten.com/600/350"
  const description = "Beneficiary description"
  const beneficiary = accounts[1]
  // const custodian = accounts[0]
  const owner = accounts[0]

   beforeEach(async () => {
    fundraiser = await FundraiserContract.new(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      owner
    )
  }) 

  describe("initialization", () => {

    it("gets the beneficiary name", async () => {
      const actual = await fundraiser.name()
      assert.equal(actual, name, "names should match")
    })

    it("gets the url", async () => {
      const actual = await fundraiser.url()
      assert.equal(actual, url, "names should match")
    })

    it("gets the imageURL", async () => {
      const actual = await fundraiser.imageURL()
      assert.equal(actual, imageURL, "imageURL should match")
    })

    it("gets the description", async () => {
      const actual = await fundraiser.description()
      assert.equal(actual, description, "description should match")
    })

    it("gets the beneficiary", async () => {
      const actual = await fundraiser.beneficiary()
      assert.equal(actual, beneficiary, "beneficiary should match")
    })

    it("gets the owner", async () => {
      const actual = await fundraiser.owner()
      assert.equal(actual, owner, "owner should match")
    })
  })

  describe("setBeneficiary", () => {
    const newBeneficiary = accounts[2]

    it("updated beneficiary when called by owner account", async () => {
      await fundraiser.setBeneficiary(newBeneficiary, { from: owner })
      const actualBeneficiary = await fundraiser.beneficiary()

      assert.equal(actualBeneficiary, newBeneficiary, "beneficiaries should match")
    })

    it("throws an error when called from a non-owner account", async () => {
      try {
        await fundraiser.setBeneficiary(newBeneficiary, { from: accounts[3] })
        assert.fail("withdraw was not restricted to owners")
      } catch (err) {
        const expectedError = "Ownable: caller is not the owner"
        const actualError = err.reason 
        assert.equal(actualError, expectedError, "should not be permitted")
      }
    })
  })
})