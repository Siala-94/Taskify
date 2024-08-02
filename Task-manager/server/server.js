import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json);
app.use(cors());

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
