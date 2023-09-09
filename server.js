const express = require("express");
const path = require("path");

let app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.use((req, res, next) => {
	console.log(`Requested URL: ${req.url}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello from the server side...");
});

app.listen(3000);
