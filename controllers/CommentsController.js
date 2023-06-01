import CommentModel from "../models/Comment.js";
import { CommentService } from "../services/CommentService.js";

export class CommentsController {
  static async fetchByPost(req, res) {
    const postId = req.params.postId;
    try {
      const newComment = await CommentService.getByPost(postId);
      res.json(newComment);
    } catch (err) {
      console.log(err);
    }
  }

  static async create(req, res) {
    const postId = req.params.postId;
    const userId = req.userId;
    const text = req.body.text;

    if (!text) {
      return res.code(400).json({ message: "field text is empty" });
    }

    try {
      const newComment = await CommentService.create(postId, userId, text);
      res.json(newComment);
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(req, res) {}
}
