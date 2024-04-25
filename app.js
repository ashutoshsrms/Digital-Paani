const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
connectDB();
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());

//default route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// importing the routes
const authRouter = require("./routes/authRoutes");
const bookRouter = require("./routes/bookRoutes");

// Using the routes
app.use("/api/auth", authRouter);
app.use("/api/book",  bookRouter);

const PORT = process.env.PORT || 3000; // add Fallback port
app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
