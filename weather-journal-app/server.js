// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of the app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder to serve static files
app.use(express.static('website'));

// Setup Server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

// POST Route to add weather data
app.post('/addWeatherData', (req, res) => {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    res.send(projectData); // Respond with the updated data
});

// GET Route to retrieve project data
app.get('/all', (req, res) => {
    res.send(projectData); // Send back project data
});
