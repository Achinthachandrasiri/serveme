const crypto = require('crypto');

const generateRandomString = () => {
    return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateRandomString();
console.log("Generated Secret Key:", secretKey);
