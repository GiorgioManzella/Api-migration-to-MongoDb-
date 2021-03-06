import express from "express";
import blogSchema from "./blogSchema.js";
import { basicAuthMiddleware } from "../../src/auth/basicAuth.js";
import { generateAccessToken } from "../../src/auth/tools.js";

const blogRouter = express.Router();

//********************************************************LOGIN */

blogRouter.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const blog = await blogSchema.checkCredentials(email, password);
    if (blog) {
      const token = await generateAccessToken({
        _id: blog._id,
        role: blog.role,
      });
      res.send({ accessToken: token });
    } else {
      next(createError(401, "creadential are not ok"));
    }
  } catch (error) {}
});

//*********************************************************POST

blogRouter.post("/", basicAuthMiddleware, async function (req, res, next) {
  try {
    const newBlog = new blogSchema(req.body);
    const { _id } = await newBlog.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
//*********************************************************GET

blogRouter.get("/", basicAuthMiddleware, async function (req, res, next) {
  try {
    const blogs = await blogSchema.find();
    res.send(blogs);
  } catch (error) {
    next(error);
  }
});
//*********************************************************GET BY ID

blogRouter.get(
  "/:userid",
  basicAuthMiddleware,
  async function (req, res, next) {
    try {
      const selectedBlog = await blogSchema.findById(req.params.userid);
      res.send(selectedBlog);
    } catch (error) {
      next(createError(404, "blog not found"));
    }
  }
);
//*********************************************************UPDATE

blogRouter.put(
  "/:userid",
  basicAuthMiddleware,
  async function (req, res, next) {
    try {
      const updatedBlog = await blogSchema.findOneAndUpdate(
        req.params.userid,
        req.body
      );
      res.send(updatedBlog);
    } catch (error) {
      next(error);
    }
  }
);
//d*********************************************************DELETE

blogRouter.delete(
  "/:userid",
  basicAuthMiddleware,
  async function (req, res, next) {
    try {
      const deleteBlog = await blogSchema.findOneAndDelete(req.params.userid);
      res.status(204).send("Blog deleted");
    } catch (error) {
      next(error);
    }
  }
);

export default blogRouter;
