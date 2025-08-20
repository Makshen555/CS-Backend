const pool = require('./db');

const ProductModel = {
  async createProduct(code, name, description, quantity, price) {
    const result = await pool.query(
      'INSERT INTO products (code, name, description, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [code, name, description, quantity, price]
    );
    return result.rows[0];
  },

  async getAllProducts() {
    const result = await pool.query('SELECT * FROM products ORDER BY name');
    return result.rows;
  },

  async getProductById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  },

  async updateProduct(id, code, name, description, quantity, price) {
    const result = await pool.query(
      'UPDATE products SET code=$1, name=$2, description=$3, quantity=$4, price=$5 WHERE id=$6 RETURNING *',
      [code, name, description, quantity, price, id]
    );
    return result.rows[0];
  },

  async deleteProduct(id) {
    const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = ProductModel;
