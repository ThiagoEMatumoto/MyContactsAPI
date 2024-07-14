import CategoryRepository from "../repositories/CategoryRepository.js";

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const category = await CategoryRepository.findAll(orderBy);
    response.json(category);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoryRepository.findById(id);
    if (category) {
      response.json(category);
    } else {
      response.status(404).json({ error: "Category not found" });
    }
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const newCategory = await CategoryRepository.create(name);
    response.status(201).json(newCategory);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExists = await CategoryRepository.findById(id);

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }
    if (!categoryExists) {
      return response
        .status(400)
        .json({ error: "this category  does not exist" });
    }
    const category = await CategoryRepository.update(id, name);
    response.status(201).json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    const category = await CategoryRepository.findById(id);
    if (category) {
      await CategoryRepository.delete(id);
      response.sendStatus(204);
    } else {
      response.status(404).json({ error: "ategory not found" });
    }
  }
}

export default new CategoryController();
