import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes/booksRoute.js";

const app = express();
// Middleware for parsing request body
app.use(express.json());

// Middleware to handle CORS Policy
// Option 1: Allow All origins with default of cors(*)
app.use(cors());
// Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST", "UPDATE", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Middleware for bookRoutes
app.use("/books", route);

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("DB Connected succenssfully");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
