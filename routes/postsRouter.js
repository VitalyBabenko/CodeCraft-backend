import Router from "express";
import { PostsController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { postCreateValidation } from "../validations/index.js";

const postsRouter = new Router();

// get
postsRouter.get("/tags", PostsController.getLastTags);
postsRouter.get("/posts", PostsController.getAll);
postsRouter.get("/posts/tags", PostsController.getLastTags);
postsRouter.get("/posts/tags/:tag", PostsController.getPostsByTag);
postsRouter.get("/posts/:id", PostsController.getOne);

// post
postsRouter.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostsController.create
);

// delete
postsRouter.delete("/posts/:id", checkAuth, PostsController.remove);

// patch
postsRouter.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostsController.update
);

export { postsRouter };
