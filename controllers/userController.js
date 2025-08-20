// backend/controllers/userController.js
const UserModel = require('../models/userModel');

const UserController = {
  async create(req, res) {
    try {
      const { username, password, role } = req.body;

      if (!username || !password || !role) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const newUser = await UserModel.createUser(username, password, role);
      res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async list(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = UserController;