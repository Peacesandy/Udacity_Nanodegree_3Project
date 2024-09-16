// Global Variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=7abf6e6de6ab374b1758bdd31100a9b5&units=metric'; // Celsius

// Get current date
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener for the "Generate" button
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zip = document.getElementById('zip').value; // Get zip code from input field
    const feelings = document.getElementById('feelings').value; // Get user input (feelings)
    const newDate = new Date().toLocaleDateString();

    // Step 1: Fetch the weather data
    getWeatherData(baseURL, zip, apiKey)
        .then(function (weatherData) {
            // Step 2: Post the data to the server
            postData('/addWeatherData', {
                temperature: weatherData.main.temp, // temperature in Celsius
                date: newDate,
                userResponse: feelings
            });
        })
        .then(() => {
            // Step 3: Update the UI after the data is successfully posted
            updateUI();
        });
}

// Async GET request to OpenWeatherMap API
const getWeatherData = async (baseURL, zip, apiKey) => {
    const response = await fetch(baseURL + zip + apiKey);
    try {
        const data = await response.json();
        return data; // Return weather data
    } catch (error) {
        console.log("error", error);
    }
};

// Async POST request to add data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the data as JSON
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Async function to update the UI
const updateUI = async () => {
    const request = await fetch('/all'); // Fetch data from the server
    try {
        const allData = await request.json(); // convert response to json
        // Update DOM elements with the new data
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}°C`;
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.userResponse}`;
    } catch (error) {
        console.log("error", error);
    }
};
