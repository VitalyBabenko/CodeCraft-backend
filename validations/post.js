import { body } from "express-validator";

const error = {
  title: "Title is empty or shorter than 3 characters",
  text: "Article text is empty or shorter than 10 characters",
  tags: "Bad tag format (array required)",
  imageUrl: "Image link is invalid",
};

export const postCreateValidation = [
  body("title", error.title).isLength({ min: 3 }).isString(),
  body("text", error.text).isLength({ min: 10 }).isString(),
  body("tags", error.tags).optional().isString(),
  body("imageUrl", error.imageUrl).optional().isString(),
];
