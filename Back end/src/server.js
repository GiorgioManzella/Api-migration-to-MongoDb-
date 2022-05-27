import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-Endpoints";
import blogRouter from "../services/blogs/index.js";
import commentRouter from "../services/comments/index.js";
import storyRouter from "../services/stories/index.js";
import {
  unauthorizedHandler,
  forbidden,
  catchAllErros,
} from "../src/error-handler.js";
import userRouter from "../services/users/index.js";

const server = express();
const port = process.env.PORT || 3000;

//*****************************************MIDDLEWARES

server.use(cors()); //cross origin resource sharing
server.use(express.json()); // ability to receive and send JSON responses

//********************************************ENDPOINTS */
server.use("/user", userRouter);
server.use("/blog", blogRouter);
server.use("blog/comments", commentRouter);
server.use("me/stories", storyRouter);

//********************************ERROR HANDLERS

server.use(unauthorizedHandler);
server.use(forbidden);
server.use(catchAllErros);

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("successifully connected"),
    server.listen(port, () => {
      console.table(listEndpoints(server));
      console.log(`server is running on port: ${port}`);
    });
});
