const jwt = require('jsonwebtoken');

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token, process.env.JWT_SECRET_KEY, function (err, data) {
          if (err) {
              return res.sendStatus(403);
          }
          else {
              next();
          }
      })
  }
  else {
      return res.sendStatus(403);
  }
}

  module.exports = {
    randomNumber: randomNumber,
    ensureToken: ensureToken
}