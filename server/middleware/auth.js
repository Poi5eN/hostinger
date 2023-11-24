const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Cookies",cookie)
  // console.log("Token",token)
  if (!token) {
    return res.status(401).json({ message: 'Please Login First' });
  }

  try {

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user; 
    next(); 

  } catch (error) {

    return res.status(401).json({ message: error.message });

  }  
};

module.exports = verifyToken;