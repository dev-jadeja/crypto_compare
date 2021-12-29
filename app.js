const express = require("express");
const connectDB = require("./config/db");
const usersRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");
const comparisonsRoute = require("./routes/api/comparisons");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("API running"));
app.use("/api/users", usersRoute);
app.use("/api/comparisons", comparisonsRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
