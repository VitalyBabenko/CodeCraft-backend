import PostModel from "../models/Post.js";

export class PostsService {
  static async getAll(sortBy, orderBy) {
    const sort = {};
    sort[sortBy] = orderBy;
    const posts = await PostModel.find().populate("user").sort(sort).exec();
    return posts;
  }

  static async getOne(postId) {
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
      throw new Error({
        message: "Post not found",
      });
    }

    return post;
  }

  static async getPostsByTag(tag, sortBy, orderBy) {
    const sort = {};
    sort[sortBy] = orderBy;
    const posts = await PostModel.find({ tags: tag })
      .populate("user")
      .sort(sort)
      .exec();

    return posts;
  }

  static async create(post) {
    const doc = new PostModel(post);
    const savedPost = await doc.save();

    if (!savedPost) {
      throw new Error({
        message: "Post not created",
      });
    }

    return savedPost;
  }

  static async remove(postId) {
    const deletedPost = await PostModel.findOneAndDelete({
      _id: postId,
    });

    if (!deletedPost) {
      throw new Error({
        message: "Failed to delete post",
      });
    }

    return deletedPost;
  }

  static async update(postId, post) {
    const updatedPost = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        post,
      }
    );

    if (!updatedPost) {
      throw new Error({
        message: "Failed to update post",
      });
    }

    return updatedPost;
  }
}
