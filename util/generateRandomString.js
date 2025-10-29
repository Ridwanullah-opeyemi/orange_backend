const crypto = require("crypto")

const generateRandomString = (num = 8)=>{
    const token = crypto.randomBytes(num).toString("hex")
    return token
}

module.exports = generateRandomString
