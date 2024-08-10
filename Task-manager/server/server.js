import express from "express";
import cors from "cors";
import connectToDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
connectToDB();

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
