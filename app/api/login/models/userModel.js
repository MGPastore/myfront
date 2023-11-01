const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Elimina espacios en blanco al principio y al final
    minlength: 3, // Mínimo de 3 caracteres
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Mínimo de 6 caracteres
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Middleware para hashear la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Método estático para encontrar un usuario por credenciales
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Credenciales incorrectas');
  }

  return user;
};

// Método para generar un token JWT
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, 'clave-secreta');

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
