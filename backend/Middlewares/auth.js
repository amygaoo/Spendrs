const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token :>> ', token);
  if (token == null) {
    // if there isn't any token
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

const authenticateRefreshToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const token = req.body['refreshToken'];
  if (token == null) {
    // if there isn't any token
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

exports.authenticateToken = authenticateToken;
exports.authenticateRefreshToken = authenticateRefreshToken;