const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const createToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET , { expiresIn: '1h' });
  return token;
};

const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000*60*60*24   //for 1 day
  });
};

const fetchTokenFromCookie = (req) => {
  return req.cookies.token;
};

const hashPassword = (password) => {
  const res = bcrypt.hash(password, 10)
  return res
}

const verifyPassword = async (password, hashPassword) => {
  const res = await bcrypt.compare(password, hashPassword)
  return res
}

module.exports = {
  createToken,
  verifyPassword,
  hashPassword,
  setTokenCookie,
  fetchTokenFromCookie,
};