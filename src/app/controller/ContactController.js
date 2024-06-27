import ContactRepository from "../repositories/ContactRepository.js";

class ContactController {
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

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }
    if (!phone) {
      return response.status(400).json({ error: "Phone is required" });
    }
    if (!email) {
      return response.status(400).json({ error: "Email is required" });
    }
    if (!category_id) {
      return response.status(400).json({ error: "Category id is required" });
    }
    if (contactExists) {
      return response
        .status(400)
        .json({ error: "this e-mail is already in use" });
    }
    const newContact = await ContactRepository.create(
      name,
      email,
      phone,
      category_id
    );
    response.status(201).json(newContact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactRepository.findById(id);
    const contactEmailExists = await ContactRepository.findByEmail(email);

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }
    if (contactExists && contactEmailExists.id !== id) {
      return response
        .status(400)
        .json({ error: "this e-mail is already in use" });
    }
    const contact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });
    response.status(201).json(contact);
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
