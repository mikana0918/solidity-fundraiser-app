pragma solidity >0.4.23 <0.7.0;

contract Fundraiser {
    string public name;
    string public url;
    string public imageURL;
    string public description;
    string public beneficiary;
    string public custodian;

    constructor(
        string memory _name,
        string memory _url,
        string memory _imageURL,
        string memory _description,
        string memory _beneficiary,
        string memory _custodian
    ) public {
        name = _name;
        url = _url;
        imageURL = _imageURL;
        description = _description;
        beneficiary = _beneficiary;
        custodian = _custodian;
    }
}
