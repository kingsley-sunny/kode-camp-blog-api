const { default: slugify } = require("slugify");
const database = require("../../database/database");
const createSuccessResponse = require("../../helpers/customSuccessResponse");

class TaskController {
  async create(req, res) {
    const { title, image, content, slug, tags } = req.body;
    const formattedSlug = slugify(slug || title, {
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
}

module.exports = TaskController;
