var jwt = require('jsonwebtoken');
const jwtSecret = "sajidsajid";
const fetchuser =(req, res, next)=>{
   const token = req.header('auth-token');
 
   try {
    const data = jwt.verify(token,jwtSecret);
    req.user = data.user
    next()
   } catch (error) {
    res.status(401).send({error: "token is not valid"})
   }

}

module.exports = fetchuser;
