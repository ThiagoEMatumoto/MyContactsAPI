import { v4 } from "uuid";
import query from "../database/index.js";

let contacts = [
  {
    id: v4(),
    name: "Thiago",
    email: "thiago@gmail.com",
    phone: "1123456789",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "Maria",
    email: "maria@hotmail.com",
    phone: "1198765432",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "João",
    email: "joao@yahoo.com",
    phone: "1134567890",
    category_id: v4(),
  },
  {
    id: v4(),
    name: "Ana",
    email: "ana@outlook.com",
    phone: "1192345678",
    category_id: v4(),
  },
];

class ContactRepository {
  async findAll() {
    const table = await query(`SELECT * FROM contacts`);
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
