const { default: slugify } = require("slugify");
const database = require("../../database/database");
const createSuccessResponse = require("../../helpers/customSuccessResponse");
const CustomErrorApi = require("../../helpers/customErrorApi");
const { StatusCodes } = require("http-status-codes");

class TaskController {
  async create(req, res) {
    const { title, image, content, tags } = req.body;
    const formattedSlug = slugify(title, {
      lower: true,
    });

    // check if the slug exists
    let task = await database.post.findFirst({
      where: {
        slug: formattedSlug,
      },
    });

    if (task) {
      return res.json({
        message: "Slug already exists, use a different Title or add a slug to it",
      });
    }

    task = await database.post.create({
      data: {
        title,
        image,
        content,
        slug: formattedSlug,
        authorId: req.user.id,
        tags,
      },
    });

    return res.json(createSuccessResponse(task, "Successfully Created Task"));
  }

  async getAllTasks(req, res) {
    let tasks = await database.post.findMany({
      where: {
        authorId: req.user.id,
      },
    });

    return res.json(createSuccessResponse(tasks, "Successful fetched Tasks"));
  }

  async editTask(req, res) {
    let details = req.body;

    const task = await database.post.update({
      where: {
        id: req.params.id,
        authorId: req.user.id,
      },
      data: {
        title: details.title,
        content: details.content,
        image: details.image,
        tags: details.tags,
      },
    });

    return res.json(createSuccessResponse(task, "Successfully Updated Task"));
  }
}

module.exports = TaskController;
