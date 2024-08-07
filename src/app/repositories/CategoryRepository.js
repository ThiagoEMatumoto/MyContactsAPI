import query from "../database/index.js";

class CategoryRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const table = await query(
      `SELECT * FROM categories ORDER BY name ${direction}`
    );
    return table;
  }

  async findById(id) {
    const [row] = await query(`SELECT * FROM categories WHERE id = $1`, [id]);
    return row;
  }

  async create(name) {
    const [row] = await query(
      `INSERT INTO categories(name) VALUES($1) RETURNING *`,
      [name]
    );
    return row;
  }

  async update(id, name) {
    const [row] = await query(
      `UPDATE categories SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id]
    );
    return row;
  }

  async delete(id) {
    const [row] = await query(`DELETE FROM categories WHERE id = $1`, [id]);
    return row;
  }
}

export default new CategoryRepository();
