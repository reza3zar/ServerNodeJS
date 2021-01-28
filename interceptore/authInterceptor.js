const jwt=require("jsonwebtoken");

module.exports =function (req,res,next) {

    const token=req.header('auth-token');
    if(!token) return res.status(401).send({errorMessage:'access denied!'});

    try {
        const verifyVal=jwt.verify(token,process.env.TOKEN_ENCRYPT);
        req.user=verifyVal;
        // console.log(req.user)
        next()

    } catch (error) {
            return res.status(400).send({errorMessage:'invalid Token'});
        
    }
    
}

 