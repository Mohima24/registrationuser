const jwt = require('jsonwebtoken')

const authentication = (req,res,next)=>{
    let token  = req.headers.authorization;
    if(token){
        jwt.verify(token, 'userToken', (err, decoded) =>{
            if(err){
                console.log(token)
                res.status(501)
                res.send({msg:"error while verify the token"})
                return
            }else{
                req.body.userID = decoded.userID;
                req.body.email = decoded.useremail;
                next()
            }
        })
    }else{
        res.status(403)
        res.send({msg:"please log in first"})
    }
}

module.exports = authentication