import express from "express";
import userSchema from "./userSchema.js";
import { generateAccessToken } from "../../src/auth/tools.js";
import createError from "http-errors";
import passport from "passport";

const userRouter = express.Router();

userRouter.post("/login", async (req, res, next) => {
  try {
    // console.log("hola");
    const { email, password } = req.body;

    const user = await userSchema.checkCredentials(email, password);

    console.log(user);

    if (user) {
      const accessToken = await generateAccessToken({
        _id: user._id,
        role: user.role,
      });

      console.table({ accessToken });
      res.send({ accessToken: accessToken });
    } else {
      next(createError(401, "credentials not valid"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new userSchema(req.body);

    await newUser.save();

    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get("/googleredirect", passport.authenticate("google"), () => {
  console.log(req.token);
  res.redirect(`http://localhost:3000?accessToken=${req.user.token}`);
});

export default userRouter;

// implement google authentication + create a front end
