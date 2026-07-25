const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const apiRoute = require("./router/api");
const { connectDB } = require("./config/db");
const cors = require("cors");
connectDB();

app.use(express.static("public"));

app.use(
  cors({
    origin: [
      "https://e-commerce-five-khaki-66.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api", apiRoute);

app.get("/", (req, res) => {
  res.send("hello backend");
});

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
