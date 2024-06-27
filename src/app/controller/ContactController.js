import ContactRepository from "../repositories/ContactRepository.js";

class ContactController {
  constructor() {
    this.contacts = [];
    this.nextId = 1;

    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async index(request, response) {
    const contacts = await ContactRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);
    if (contact) {
      response.json(contact);
    } else {
      response.status(404).json({ error: "Contact not found" });
    }
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;
    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: "this e-mail is already been taken" });
    }
    const newContact = ContactRepository.create(
      name,
      email,
      phone,
      category_id
    );
    response.status(201).json(newContact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, phone, email } = request.body;
    const contactIndex = this.contacts.findIndex(
      (contact) => contact.id === parseInt(id)
    );
    if (contactIndex !== -1) {
      this.contacts[contactIndex] = { id: parseInt(id), name, phone, email };
      response.json(this.contacts[contactIndex]);
    } else {
      response.status(404).json({ error: "Contact not found" });
    }
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);
    if (contact) {
      await ContactRepository.delete(id);
      response.sendStatus(204);
    } else {
      response.status(404).json({ error: "Contact not found" });
    }
  }
}

export default new ContactController();
