const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// Setting path to JSON file.
const formDataPath = path.join(__dirname, "./formsubmissions.json");

app.use(express.static(path.join(__dirname, "./public")));

app.use((req, res, next) => {
	console.log(`Requested URL: ${req.url}`);
	next();
});

// Would like more explanation on what this does please.
app.use(bodyParser.urlencoded({ extended: false }));

// Post the contact form, store the data, read the file and write the data to formsubmissions.json file
app.post("/contact-form", (req, res) => {
	const { name, email } = req.body;
	const formData = { name, email };

	fs.readFile(formDataPath, "utf-8", (err, data) => {
		if (err) {
			console.log(err);
			return;
		}

		let submissions = [];

		if (data) {
			submissions = JSON.parse(data);
		}

		submissions.push(formData);

		//figured out how to indent the JSON data so i dont have to format the file when reading it.
		fs.writeFile(formDataPath, JSON.stringify(submissions, null, 2), (err) => {
			if (err) {
				console.log(err);
				return;
			}
			res.send("Contact form submitted");
		});
	});
});

// displays the form submitions to the page by going to http://localhost:3000/formsubmissions
app.get("/formsubmissions", (req, res) => {
	fs.readFile(formDataPath, "utf-8", (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		const submissions = JSON.parse(data);
		res.json(submissions);
	});
});

// app.get("/", (req, res) => {
// 	res.send("Hello from the server side...");
// });

app.listen(3000);
