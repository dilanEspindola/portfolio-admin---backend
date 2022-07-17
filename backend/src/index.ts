import express from "express";
import cors from "cors";
import userRoute from "./routes/user";
import worksRoute from "./routes/works";
import dbConnection from "./utils/db";

const app = express();

const PORT = process.env.PORT || 4000;

// starting DB
dbConnection();

// middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user/", userRoute);
app.use("/api/works/", worksRoute);

app.listen(PORT, () => {
  console.log("server on port", PORT);
});
