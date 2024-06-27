import { v4 } from "uuid";

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
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }
  delete(id) {
    return new Promise((resolve) => {
      resolve((contacts = contacts.filter((contact) => contact.id !== id)));
    });
  }
  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }
  create(name, phone, email, category_id) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name: name,
        email: email,
        phone: phone,
        category_id: category_id,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }
  update(id, { name, phone, email, category_id }) {
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
