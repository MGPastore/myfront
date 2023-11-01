const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Controlador para el registro de usuario
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para el inicio de sesión de usuario
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByCredentials(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token JWT y enviarlo como respuesta
    const token = await user.generateAuthToken();

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para el panel de control (ejemplo protegido)
exports.dashboard = async (req, res) => {
  try {
    res.json({ message: 'Bienvenido al panel de control' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
