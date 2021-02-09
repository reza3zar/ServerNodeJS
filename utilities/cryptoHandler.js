const bcrypyjs=require('bcryptjs')

async function generateCryptData (data)  {
try {
    const salt= await bcrypyjs.genSalt(10);
    return await bcrypyjs.hash(data,salt);
} catch (error) {
    console.log('generateCryptData:',error)
}
}

module.exports.generateCryptData=generateCryptData;