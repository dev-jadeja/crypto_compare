const express = require("express");
const connectDB = require("./config/db");
const usersRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");
const comparisonsRoute = require("./routes/api/comparisons");
const path = require("path");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRoute);
app.use("/api/comparisons", comparisonsRoute);
app.use("/api/auth", authRoute);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
