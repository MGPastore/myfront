const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  jwt.verify(token, 'clave-secreta', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
