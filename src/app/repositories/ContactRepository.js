import query from "../database/index.js";

class ContactRepository {
  async findAll(orderBy = "ASC") {
    const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
    const table = await query(
      `SELECT * FROM contacts ORDER BY name ${direction}`
    );
    return table;
  }
  async findById(id) {
    const [row] = await query(`SELECT * FROM contacts WHERE id = $1`, [id]);
    return row;
  }
  async delete(id) {
    const [row] = await query(`DELETE FROM contacts WHERE id = $1`, [id]);
    return row;
  }
  async findByEmail(email) {
    const [row] = await query(`SELECT * FROM contacts WHERE email = $1`, [
      email,
    ]);
    return row;
  }
  async create(name, email, phone, category_id) {
    // const row = await query(
    //   `INSERT INTO contacts(name, email, phone, category_id) VALUES(${name},${email},${phone}, ${category_id})`
    // );
    const [row] = await query(
      `INSERT INTO contacts(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, category_id]
    );
    return row;
  }
  async update(id, { name, phone, email, category_id }) {
    const [row] = await query(
      `UPDATE contacts SET name = $1, email = $2, phone = $3, category_id = $4) RETURNING *`,
      [name, email, phone, category_id]
    );
    return row;
  }
}

export default new ContactRepository();
