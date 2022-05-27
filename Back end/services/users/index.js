import express from "express";
import userSchema from "./userSchema.js";
import { generateAccessToken } from "../../src/auth/tools.js";

const userRouter = express.Router();

userRouter.post("/login", async (req, res, next, error) => {
  try {
    const { email, password } = req.body.headers;

    const user = await userSchema.chckCredentials(email, password);

    if (user) {
      const accessToken = await generateAccessToken({
        _id: user._id,
        role: user.role,
      });
      res.send({ accessToken });
    } else {
      next(createError(401, "credentials not valid"));
    }
  } catch (error) {
    next(error);
  }
});

export default userRouter;
