import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import { checkAuth } from "./utils/index.js";

import { authRouter, commentRouter, postsRouter } from "./routes/index.js";

const PORT = process.env.PORT || 4444;
const DB_URL =
  process.env.MONGODB_URI ||
  "mongodb+srv://user:user@metnblog.sratfnj.mongodb.net/blog?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB ok"))
  .catch(() => console.log("MongoDB filed"));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/", postsRouter);
app.use("/", commentRouter);

const storage = multer.diskStorage({
  destination: (_, __, callBack) => {
    callBack(null, "uploads");
  },
  filename: (_, file, callBack) => {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server work on ${PORT} port`);
});
