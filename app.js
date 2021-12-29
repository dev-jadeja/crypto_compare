const express = require("express");
const connectDB = require("./config/db");
const usersRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");
const comparisonsRoute = require("./routes/api/comparisons");

const app = express();
connectDB();

app.get("/", (req, res) => res.send("API running"));
app.use("/api/users", usersRoute);
app.use("/api/comparisons", authRoute);
app.use("/api/auth", comparisonsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
