import express from "express";
import cors from "cors";

const app = express();
const port = 5173;

app.use(express.json);
app.use(cors());

app.get("/test", (req, res) => {
  res.send("works fine");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
