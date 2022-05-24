import createError from "http-errors";
import atob from "atob";
import blogSchema from "../../services/blogs/blogSchema.js";

export const basicAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(createError(401, "provide auth"));
  } else {
    const base64C = req.headers.authorization.split(" ")[1];
    const [userName, password] = atob(base64C).split(":");
    console.log("nice", userName, password);

    const blog = await blogSchema.checkCredentials(userName, password);

    if (blog) {
      next();
    } else {
      next(createError(401, "creadiantial wrong"));
    }
  }
};
