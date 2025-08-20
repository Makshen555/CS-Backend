const ProductModel = require('../models/productModel');

const ProductController = {
  async create(req, res) {
    try {
      const { code, name, description, quantity, price } = req.body;
      if (!code || !name || !quantity || !price) {
        return res.status(400).json({ message: 'Campos obligatorios faltantes' });
      }
      const product = await ProductModel.createProduct(code, name, description, quantity, price);
      res.status(201).json({ message: 'Producto creado', product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async list(req, res) {
    try {
      const products = await ProductModel.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { code, name, description, quantity, price } = req.body;
      const product = await ProductModel.updateProduct(id, code, name, description, quantity, price);
      res.json({ message: 'Producto actualizado', product });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ProductModel.deleteProduct(id);
      res.json({ message: 'Producto eliminado' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = ProductController;
