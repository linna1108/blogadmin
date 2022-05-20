const express = require("express");
const app = express();
const router = express.Router();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path");

dotenv.config();

app.use(express.json());
app.use("/images", express.static("images"));

mongoose
.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
   
})

.then(console.log("Connect to mongoDB"))
.catch(err=>(err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


app.listen(process.env.PORT || 8800, () => {
    console.log("Backend is running.");
  });