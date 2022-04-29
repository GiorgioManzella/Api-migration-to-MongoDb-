import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-Endpoints";
import blogRouter from "../services/blogs/index.js";
import commentRouter from "../services/comments/index.js";

const server = express();
const port = process.env.PORT || 3000;

//*****************************************MIDDLEWARES

server.use(cors()); //cross origin resource sharing
server.use(express.json()); // ability to receive and send JSON responses

//********************************************ENDPOINTS */

server.use("/blog", blogRouter);
server.use("blog/comments", commentRouter);

//********************************ERROR HANDLERS

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("successifully connected"),
    server.listen(port, () => {
      console.table(listEndpoints(server));
      console.log(`server is running on port: ${port}`);
    });
});
