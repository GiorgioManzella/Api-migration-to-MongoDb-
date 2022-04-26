import express from "express";
import blogSchema from "./blogSchema.js";

const blogRouter = express.Router();

//*********************************************************POST

blogRouter.post("/", async function (req, res, next) {
  try {
    const newBlog = new blogSchema(req.body);
    const { _id } = await newBlog.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
//*********************************************************GET

blogRouter.get("/", async function (req, res, next) {
  try {
    const blogs = await blogSchema.find();
    res.send(blogs);
  } catch (error) {
    next(error);
  }
});
//*********************************************************GET BY ID

blogRouter.get("/:userid", async function (req, res, next) {
  try {
    const selectedBlog = await blogSchema.findById(req.params.userid);
    res.send(selectedBlog);
  } catch (error) {
    next(createError(404, "blog not found"));
  }
});
//*********************************************************UPDATE

blogRouter.put("/:userid", async function (req, res, next) {
  try {
    const updatedBlog = await blogSchema.findOneAndUpdate(
      req.params.userid,
      req.body
    );
    res.send(updatedBlog);
  } catch (error) {
    next(error);
  }
});
//d*********************************************************DELETE

blogRouter.delete("/:userid", async function (req, res, next) {
  try {
    const deleteBlog = await blogSchema.findOneAndDelete(req.params.userid);
    res.status(204).send("Blog deleted");
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
