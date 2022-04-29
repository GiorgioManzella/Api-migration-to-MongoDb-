import express from "express";
import commentSchema from "./commentSchema.js";
import blogSchema from "../blogs/blogSchema.js";

const commentRouter = express.Router();

//*********************************************************POST

commentRouter.post("/:userid/comments", async function (req, res, next) {
  try {
    const selectedBlog = await blogSchema.findById(req.params.userid);

    if (selectedBlog) {
      const blogToComment = { ...selectedBlog, comment: req.body };

      
    } else {
      next(createError(404, "Comment not found"));
    }
  } catch (error) {
    next(error);
  }
});
//*********************************************************GET

commentRouter.get("/", async function (req, res, next) {
  try {
    const blogs = await commentSchema.find();
    res.send(blogs);
  } catch (error) {
    next(error);
  }
});
//*********************************************************GET BY ID

commentRouter.get("/:userid", async function (req, res, next) {
  try {
    const selectedBlog = await commentSchema.findById(req.params.userid);
    res.send(selectedBlog);
  } catch (error) {
    next(createError(404, "blog not found"));
  }
});
//*********************************************************UPDATE

commentRouter.put("/:userid", async function (req, res, next) {
  try {
    const updatedBlog = await commentSchema.findOneAndUpdate(
      req.params.userid,
      req.body
    );
    res.send(updatedBlog);
  } catch (error) {
    next(error);
  }
});
//d*********************************************************DELETE

commentRouter.delete("/:userid", async function (req, res, next) {
  try {
    const deleteBlog = await commentSchema.findOneAndDelete(req.params.userid);
    res.status(204).send("Blog deleted");
  } catch (error) {
    next(error);
  }
});

export default commentRouter;
