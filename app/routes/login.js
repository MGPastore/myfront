const express = require('express');
const router = express.Router();
const loginController = require('../api/login/controllers/loginController.js'); // Utiliza la nueva estructura 'api/controllers'
const authenticateToken = require('../api/login/middleware/authenticateToken.js'); // Utiliza el middleware de autenticación

router.post('/register', loginController.register);
router.post('/login', loginController.login);

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Bienvenido al panel de control' });
});

module.exports = router;
