import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";

export class CommentService {
  static async getByPost(postId) {
    try {
      const comments = await CommentModel.find({ post: postId })
        .populate("owner")
        .exec();
      return comments;
    } catch (err) {
      console.log(err);
    }
  }
  static async create(postId, ownerId, text) {
    try {
      const post = await PostModel.findById(postId);
      if (!post) {
        throw new Error("Post not found");
      }

      const comment = new CommentModel({
        post: postId,
        owner: ownerId,
        text,
      });

      await comment.save();
      return comment;
    } catch (error) {
      throw new Error("Failed to add comment");
    }
  }
  static async remove(postId) {}
}
