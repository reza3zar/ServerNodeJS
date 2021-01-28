const bcrypyjs=require('bcryptjs')

async function generateCryptData (data)  {
    const salt= await bcrypyjs.genSalt(10);
    return await bcrypyjs.hash(data,salt);
}

module.exports.generateCryptData=generateCryptData;