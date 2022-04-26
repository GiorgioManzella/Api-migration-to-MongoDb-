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
  } catch (error) {
    next(error);
  }
});
//*********************************************************GET

blogRouter.get("/:userid", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});
//*********************************************************GET

blogRouter.get("/:userid", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});
//d*********************************************************GET

blogRouter.get("/:userid", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
