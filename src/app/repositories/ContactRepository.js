import { v4 } from "uuid";

const contacts = [
  {
    id: v4(),
    name: 'Thiago',
    email: 'thiago@gmail.com',
    phone: '1123456789',
    category_id: v4()
  }
]


class ContactRepository {
  findAll() {
    return new Promise((resolve, reject) => {
      resolve(contacts)
    })
  }
  
}

export default new ContactRepository();