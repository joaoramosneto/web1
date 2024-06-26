const DepartmentRepository = require("../repositories/Department");

class DepartmentController {
  async index(request, response) {
    const department = await DepartmentRepository.findAll();

    response.json(department);
  }

  async store(request, response) {
    const { name, description } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Nome é obrigatório" });
    }

    const department = await DepartmentRepository.create({ name, description });

    response.status(201).json(department);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, description } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const updateDepartment = await DepartmentRepository.update(id, {
      name,
      description,
    });

    response.status(200).json(updateDepartment);
  }
  async delete(request, response) {
    const { id } = request.params;
    const department = await DepartmentRepository.findById(id);
    if (!department) {
      return response.status(400).json({ error: "Invalid department id" });
    }

    await departmentRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

module.exports = new DepartmentController();
