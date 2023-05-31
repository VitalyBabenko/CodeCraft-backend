import PostModel from "../models/Post.js";

export default class PostController {
  static async getAll(_, res) {
    try {
      const posts = await PostModel.find().populate("user").exec();
      res.json(posts);
    } catch (err) {
      res.status(400).json({
        message: "Failed to get posts",
      });
    }
  }

  static async getOne(req, res) {
    try {
      const postId = req.params.id;

      const post = await PostModel.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: "after",
        }
      ).populate("user");

      if (!post) {
        return res.status(400).json({
          message: "Post not found",
        });
      }

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to get post ",
      });
    }
  }

  static async create(req, res) {
    try {
      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(","),
        user: req.userId,
      });

      const post = await doc.save();

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to create post",
      });
    }
  }

  static async remove(req, res) {
    try {
      const postId = req.params.id;

      const deletedPost = await PostModel.findOneAndDelete({
        _id: postId,
      });

      if (!deletedPost) {
        res.status(400).json({
          message: "Failed to delete post",
        });
      }

      res.json({ success: true });
    } catch (err) {
      res.status(400).json({
        message: "Failed to delete post",
      });
    }
  }

  static async update(req, res) {
    try {
      const postId = req.params.id;

      const updatedPost = await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          user: req.body.userId,
          tags: req.body.tags.split(","),
        }
      );

      if (!updatedPost) {
        res.status(400).json({
          message: "Failed to update post",
        });
      }

      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({
        message: "Failed to update post",
      });
    }
  }

  static async getLastTags(req, res) {
    try {
      const posts = await PostModel.find().limit(5).exec();

      const tags = posts
        .map((post) => post.tags)
        .flat()
        .splice(0, 5);

      res.json(tags);
    } catch (err) {
      res.status(400).json({
        message: "Failed to get posts",
      });
    }
  }
}
