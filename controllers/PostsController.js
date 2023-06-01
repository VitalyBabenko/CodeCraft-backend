import PostModel from "../models/Post.js";
import { PostsService } from "../services/PostsService.js";

export class PostsController {
  static async getAll(req, res) {
    const sortBy = req.query.sortBy;
    const orderBy = req.query.orderBy === "asc" ? 1 : -1;

    try {
      const posts = await PostsService.getAll(sortBy, orderBy);
      res.json(posts);
    } catch (err) {
      res.status(400).json({
        message: "Failed to get posts",
      });
    }
  }

  static async getOne(req, res) {
    const postId = req.params.id;
    try {
      const post = await PostsService.getOne(postId);
      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to get post",
      });
    }
  }

  static async getPostsByTag(req, res) {
    try {
      const { tag } = req.params;
      const { sortBy, orderBy } = req.query;

      const posts = await PostsService.getPostsByTag(tag, sortBy, orderBy);

      res.json(posts);
    } catch (err) {
      res.status(400).json({
        message: "Failed to get posts",
      });
    }
  }

  static async create(req, res) {
    try {
      const newPost = {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(","),
        user: req.userId,
      };
      const createdPost = await PostsService.create(newPost);
      res.json(createdPost);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "Failed to create post",
      });
    }
  }

  static async remove(req, res) {
    const postId = req.params.id;
    try {
      const deletedPost = await PostModel.findOneAndDelete({
        _id: postId,
      });

      res.json({ success: true, deletedPost });
    } catch (err) {
      res.status(400).json({
        message: "Failed to delete post",
      });
    }
  }

  static async update(req, res) {
    try {
      const postId = req.params.id;
      const post = {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.body.userId,
        tags: req.body.tags.split(","),
      };

      const updatedPost = await PostsService.update(postId, post);

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
