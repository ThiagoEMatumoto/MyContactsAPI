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
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
  async findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }
  async delete(id) {
    return new Promise((resolve) => {
      resolve((contacts = contacts.filter((contact) => contact.id !== id)));
    });
  }
  async findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }
  async create(name, email, phone, category_id) {
    // return new Promise((resolve) => {
    //   const newContact = {
    //     id: v4(),
    //     name: name,
    //     email: email,
    //     phone: phone,
    //     category_id: category_id,
    //   };
    //   contacts.push(newContact);
    //   resolve(newContact);
    // });
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
    return new Promise((resolve) => {
      const updateContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };
      contacts = contacts.map((contact) =>
        contact.id === id ? updateContact : contact
      );
      resolve(updateContact);
    });
  }
}

export default new ContactRepository();
