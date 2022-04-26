import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-Endpoints";

const server = express();
const port = process.env.PORT || 3000;

//*****************************************MIDDLEWARES

server.use(cors()); //cross origin resource sharing
server.use(express.json()); // ability to receive and send JSON responses

//********************************************ENDPOINTS */

//********************************ERROR HANDLERS

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("successifully connected"),
    server.listen(port, () => {
      console.table(listEndpoints(server));
      console.log(`server is running on port: ${port}`);
    });
});
