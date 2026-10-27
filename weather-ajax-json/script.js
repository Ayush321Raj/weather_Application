/**
 * ==============================================================================
 * Weather Information Web Application - script.js
 * Course: Internet and Web Technology (IWT) Lab Experiment
 * Concepts Demonstrated: AJAX, JSON, JavaScript Fetch API, Promises, DOM Manipulation
 * ==============================================================================
 */

// ==============================================================================
// 1. DOM Element References
// ==============================================================================
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherForm = document.getElementById("weatherForm");

// Status Areas
const loadingMessage = document.getElementById("loadingMessage");
const statusMessage = document.getElementById("statusMessage");

// Weather Display Elements
const weatherDisplay = document.getElementById("weatherDisplay");
const initialState = document.getElementById("initialState");
const cityNameElem = document.getElementById("cityName");
const temperatureElem = document.getElementById("temperature");
const conditionElem = document.getElementById("weatherCondition");
const humidityElem = document.getElementById("humidity");
const windSpeedElem = document.getElementById("windSpeed");
const weatherIconElem = document.getElementById("weatherIcon");

// Sample City Quick-Select Buttons
const cityChips = document.querySelectorAll(".city-chip");

// ==============================================================================
// 2. Helper Functions: Weather Icons & Status Management
// ==============================================================================

/**
 * Returns an appropriate Unicode weather icon based on the weather condition text.
 * @param {string} condition - Weather condition (e.g., "Sunny", "Rainy")
 * @returns {string} - Unicode emoji representing the condition
 */
function getWeatherIcon(condition) {
  const normalized = condition.toLowerCase();
  if (normalized.includes("sunny") || normalized.includes("clear")) {
    return "☀️";
  } else if (normalized.includes("partly cloudy") || normalized.includes("scattered")) {
    return "⛅";
  } else if (normalized.includes("cloud") || normalized.includes("overcast")) {
    return "☁️";
  } else if (normalized.includes("rain") || normalized.includes("shower") || normalized.includes("drizzle")) {
    return "🌧️";
  } else if (normalized.includes("thunder") || normalized.includes("storm")) {
    return "⛈️";
  } else if (normalized.includes("snow")) {
    return "❄️";
  } else if (normalized.includes("fog") || normalized.includes("mist")) {
    return "🌫️";
  }
  return "🌤️";
}

/**
 * Sets the loading state in the UI.
 * Shows the loading spinner and disables the button to prevent duplicate clicks.
 */
function showLoading() {
  loadingMessage.classList.remove("hidden");
  statusMessage.classList.add("hidden");
  weatherDisplay.classList.add("hidden");
  initialState.classList.add("hidden");
  getWeatherBtn.disabled = true;
}

/**
 * Clears the loading state once the request is completed.
 */
function hideLoading() {
  loadingMessage.classList.add("hidden");
  getWeatherBtn.disabled = false;
}

/**
 * Displays a feedback or error message to the user.
 * @param {string} message - Message text to show
 */
function showStatus(message) {
  statusMessage.textContent = message;
  statusMessage.classList.remove("hidden");
  weatherDisplay.classList.add("hidden");
  initialState.classList.add("hidden");
}

/**
 * Hides all status and error messages.
 */
function hideStatus() {
  statusMessage.classList.add("hidden");
  statusMessage.textContent = "";
}

// ==============================================================================
// 3. Core AJAX and DOM Manipulation Logic
// ==============================================================================

/**
 * Fetches weather data asynchronously using the JavaScript Fetch API.
 * Reads local weather.json, parses JSON, searches for city, and updates DOM.
 */
function fetchWeather() {
  // Step 1: Get city entered by the user
  const userCity = cityInput.value.trim();

  // Validate input: Check whether the input is empty
  if (userCity === "") {
    showStatus("Please enter a city name.");
    return;
  }

  // Step 2: Show loading state before starting the AJAX request
  showLoading();

  // Step 3: Send AJAX request to JSON file using fetch()
  // Asynchronous HTTP GET request without reloading the webpage
  fetch("weather.json")
    .then((response) => {
      // Check if the response was successful (HTTP status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Step 4: Convert response into JSON (Returns a Promise)
      return response.json();
    })
    .then((weatherData) => {
      // Request finished successfully: hide the loading state
      hideLoading();

      // Step 5: Find weather information for requested city (case-insensitive)
      // Normalize user input to lowercase
      const searchTarget = userCity.toLowerCase();
      
      // Look for matching key in the weatherData object
      const matchedCityKey = Object.keys(weatherData).find(
        (city) => city.toLowerCase() === searchTarget
      );

      if (matchedCityKey) {
        // City found in JSON! Retrieve weather details
        const cityData = weatherData[matchedCityKey];

        // Step 6: Display weather data on webpage by manipulating the DOM
        cityNameElem.textContent = matchedCityKey;
        temperatureElem.textContent = `${cityData.temperature}°C`;
        conditionElem.textContent = cityData.condition;
        humidityElem.textContent = `Humidity: ${cityData.humidity}%`;
        windSpeedElem.textContent = `Wind Speed: ${cityData.windSpeed} km/h`;

        // Update dynamic weather icon
        weatherIconElem.textContent = getWeatherIcon(cityData.condition);

        // Make the weather card visible and hide any error messages
        hideStatus();
        weatherDisplay.classList.remove("hidden");
        initialState.classList.add("hidden");
      } else {
        // City not found in JSON
        showStatus("Weather data not available for this city.");
      }
    })
    .catch((error) => {
      // Step 7: Handle errors gracefully (e.g. network failure or missing JSON file)
      console.error("AJAX Fetch Error:", error);
      hideLoading();
      showStatus("Unable to fetch weather data. Please try again.");
    });
}

// ==============================================================================
// 4. Event Listeners
// ==============================================================================

// Click event listener for "Get Weather" button
getWeatherBtn.addEventListener("click", fetchWeather);

// Keydown event listener: Allow pressing "Enter" key inside input field without reload
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent accidental form submit or page reload
    fetchWeather();
  }
});

// Click handlers for sample city chips (evaluator convenience)
cityChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const selectedCity = chip.getAttribute("data-city");
    cityInput.value = selectedCity;
    fetchWeather();
  });
});
