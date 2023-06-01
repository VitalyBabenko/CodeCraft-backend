import Router from "express";
import { CommentsController } from "../controllers/index.js";
import checkAuth from "../utils/checkAuth.js";

const commentRouter = new Router();

// get comment by post
commentRouter.get("/comments/:postId", CommentsController.fetchByPost);

// create
commentRouter.post("/comments/:postId", checkAuth, CommentsController.create);

// remove
commentRouter.delete(
  "/comments/:postId/:commentId",
  checkAuth,
  CommentsController.remove
);

export { commentRouter };
