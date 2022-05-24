import storiesShema from "./storiesShema.js";
import blogShema from "../blogs/blogSchema.js";
import express from "express";

const storyRouter = express.Router();

storyRouter.get("/", async function (req, res, next) {
  try {
    const story = await storySchema.find();
    res.send(story);
  } catch (error) {
    next(error);
  }
});

export default storyRouter;
