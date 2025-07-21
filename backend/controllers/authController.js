// // backend/controllers/authController.js - VERSIÓN CORRECTA

// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// // Si usas bcrypt, también impórtalo
// // const bcrypt = require('bcryptjs');

// // Helper para generar el token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // Controlador para registrar un usuario
// const registerUser = async (req, res) => {
//   // Lógica para registrar usuario
//   // ... por ahora, podemos poner un placeholder
//   res.status(201).json({ message: "Usuario registrado (endpoint funciona)" });
// };

// // Controlador para loguear un usuario
// const loginUser = async (req, res) => {
//   // Lógica para loguear usuario
//   // ... por ahora, podemos poner un placeholder
//   res.status(200).json({ message: "Login exitoso (endpoint funciona)" });
// };

// // Controlador para obtener datos del usuario logueado
// const getMe = async (req, res) => {
//   // Lógica para obtener el perfil del usuario
//   // ... por ahora, podemos poner un placeholder
//   res.status(200).json({ message: "Datos del perfil (endpoint funciona)" });
// };

// // ¡¡ESTA ES LA LÍNEA MÁS IMPORTANTE!!
// // Exportas todas las funciones que quieres usar en otros archivos.
// module.exports = {
//   registerUser,
//   loginUser,
//   getMe,
// };

// backend/controllers/authController.js - VERSIÓN FINAL Y FUNCIONAL

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper para generar el token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  console.log("PASO 1: Entrando a la función registerUser.");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log("ERROR: Faltan campos. Saliendo.");
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos" });
  }

  try {
    console.log(
      "PASO 2: Entrando al bloque try. Buscando si el usuario existe..."
    );
    const userExists = await User.findOne({ email });
    console.log("PASO 3: Búsqueda de usuario completada.");

    if (userExists) {
      console.log("ERROR: El usuario ya existe. Enviando respuesta 400.");
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado" });
    }

    console.log(
      "PASO 4: El usuario no existe. Intentando crear nuevo usuario..."
    );
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log("PASO 5: Creación de usuario completada.");

    if (user) {
      console.log(
        "PASO 6: Usuario creado con éxito. Generando token y enviando respuesta 201."
      );
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      console.log(
        "ERROR: La creación del usuario no devolvió un usuario. Enviando respuesta 400."
      );
      res.status(400).json({ message: "Datos de usuario inválidos" });
    }
  } catch (error) {
    console.log("¡¡¡ERROR CRÍTICO!!! Capturado en el bloque catch.");
    console.error(error); // Imprime el error completo para más detalles
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// @desc    Autenticar (loguear) un usuario
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Verificamos si el usuario existe Y si la contraseña coincide
    // El método matchPassword está definido en tu modelo User.js
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Email o contraseña inválidos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// @desc    Obtener datos del perfil del usuario
// @route   GET /api/auth/me
// @access  Private (necesita token)
const getMe = async (req, res) => {
  // El middleware 'protect' ya habrá puesto los datos del usuario en req.user
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  };
  res.status(200).json(user);
};

// Exportamos todas las funciones
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
