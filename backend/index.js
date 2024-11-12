import dotenv from "dotenv";
import app from "./express.js";
import connectDB from "./db/db.js";
dotenv.config();
const PORT = process.env.PORT || 8080;

app.get("/testserver", (req, res) => {
  res.send("yo its runnig cuh !");
});

app.get("/", (req, res) => {
  res.send("GG");
});

connectDB();
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
