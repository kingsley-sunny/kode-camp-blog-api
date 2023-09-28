const { default: slugify } = require("slugify");
const database = require("../../database/database");
const createSuccessResponse = require("../../helpers/customSuccessResponse");
const CustomErrorApi = require("../../helpers/customErrorApi");
const { StatusCodes } = require("http-status-codes");
const { PAGE_LIMIT } = require("../../constants/constant");

class PostController {
  async create(req, res) {
    const { title, image, content, tags } = req.body;
    const formattedSlug = slugify(title, {
      lower: true,
    });

    // check if the slug exists
    let post = await database.post.findFirst({
      where: {
        slug: formattedSlug,
      },
    });

    if (post) {
      return res.json({
        message: "Slug already exists, use a different Title or add a slug to it",
      });
    }

    post = await database.post.create({
      data: {
        title,
        image,
        content,
        slug: formattedSlug,
        authorId: req.user.id,
        tags,
      },
    });

    return res.json(createSuccessResponse(post, "Successfully Created Post"));
  }

  async getAllPosts(req, res) {
    const nack = Array.from(new Set(req.query.tags));
    console.log(nack);

    let posts = await database.post.findMany({ take: PAGE_LIMIT });

    return res.json(createSuccessResponse(posts, "Successful fetched Posts"));
  }

  async getSingePost(req, res) {
    let post = await database.post.findFirst({
      where: {
        id: req.params.postId,
      },
    });

    if (!post) {
      throw new CustomErrorApi("Post not found", StatusCodes.NOT_FOUND);
    }

    return res.json(createSuccessResponse(post, "Successful fetched Post"));
  }

  async editPost(req, res) {
    let details = req.body;

    const post = await database.post.update({
      where: {
        id: req.params.postId,
        authorId: req.user.id,
      },
      data: {
        title: details.title,
        content: details.content,
        image: details.image,
        tags: details.tags,
      },
    });

    return res.json(createSuccessResponse(post, "Successfully Updated Post"));
  }
}

module.exports = PostController;
