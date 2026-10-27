# Weather Information — AJAX + JSON Web Application

An educational frontend web application built for the **Internet and Web Technology (IWT) Laboratory**. This project demonstrates how to use **AJAX**, the **JavaScript Fetch API**, **JSON data handling**, and dynamic **DOM manipulation** without reloading the webpage.

---

## 1. Project Objective

The primary objective is to demonstrate asynchronous web communication:
1. The user inputs a city name (or selects a sample city).
2. On clicking **"Get Weather"**, JavaScript intercepts the event without reloading the page.
3. JavaScript initiates an asynchronous HTTP GET request using `fetch("weather.json")`.
4. The local JSON response is parsed into a JavaScript object via `.then(response => response.json())`.
5. JavaScript locates the requested city in a case-insensitive manner.
6. The DOM (Document Object Model) is dynamically updated to display temperature, weather condition, humidity, wind speed, and an appropriate weather icon.
7. Any missing cities or network exceptions are captured gracefully using `.catch()` and user-friendly error alerts.

---

## 2. Technologies Used

- **HTML5**: Semantic elements (`<header>`, `<main>`, `<section>`, `<form>`, `<footer>`, ARIA attributes).
- **CSS3**: Responsive weather-card layout, CSS custom properties (variables), modern typography, transitions, and loading spinner animation. **Zero external CSS frameworks** (No Bootstrap, No Tailwind CSS).
- **Vanilla JavaScript (ES6+)**: Event listeners, `fetch()` API, Promises (`.then()`, `.catch()`), string normalization, and DOM manipulation. **Zero frontend libraries** (No React, No Angular, No Vue, No jQuery).
- **JSON**: Local data store (`weather.json`) providing structured meteorological data for cities.

---

## 3. Project Structure

```text
Weather_Application/
├── index.html          # Semantic HTML5 user interface & layout
├── style.css           # Vanilla CSS3 styling, animations, and responsive layout
├── script.js           # AJAX fetch logic, JSON parsing, and DOM manipulation
├── weather.json        # Mock JSON database of city weather information
├── README.md           # Comprehensive project documentation & lab viva guide
└── weather-ajax-json/  # Mirrored folder matching directory naming convention
    ├── index.html
    ├── style.css
    ├── script.js
    └── weather.json
```

---

## 4. How It Works (Data & Control Flow)

```
[ User Enters City ] 
         │
         ▼
[ Clicks "Get Weather" ] ──( e.preventDefault() prevents page reload )
         │
         ▼
[ JavaScript Reads & Trims Input ]
         │
         ├─ Empty? ──> Display "Please enter a city name." (Stop)
         │
         ▼
[ Activate Loading State ] ──( Show spinner, disable button )
         │
         ▼
[ fetch("weather.json") ] ──( Asynchronous AJAX HTTP Request )
         │
         ▼
[ response.json() ] ──( Parse JSON string into JavaScript Object )
         │
         ▼
[ City Search (Case-Insensitive) ]
         │
         ├─ Not Found ──> Display "Weather data not available for this city."
         │
         ▼ Found
[ DOM Manipulation ] ──( Update #cityName, #temperature, #humidity, etc. )
         │
         ▼
[ Webpage Dynamically Displays Weather ]
```

---

## 5. How to Run the Project

Because modern browsers enforce strict Cross-Origin Resource Sharing (CORS) / local file security policies that may block `fetch()` requests when opening `index.html` directly via the `file://` protocol, you should run the project through a lightweight local web server.

### Option 1: Using Python (Recommended & Universal)

Open your terminal or command prompt inside the project folder and run:

```bash
# Python 3
python -m http.server 5500
```

Then open your browser and navigate to:
[http://localhost:5500](http://localhost:5500)

### Option 2: Using VS Code Live Server Extension

1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
4. Your default browser will open the application automatically at `http://127.0.0.1:5500/index.html`.

---

## 6. Core IWT Concepts Demonstrated

| Concept | Implementation in Code |
| :--- | :--- |
| **AJAX** | `fetch("weather.json")` sends an asynchronous request in the background without refreshing the page. |
| **JSON** | Data formatted as key-value pairs in `weather.json` and consumed using `response.json()`. |
| **Fetch API** | Modern standard interface for fetching resources across the network asynchronously. |
| **Promises** | Chaining asynchronous stages using `.then()` for success and `.catch()` for error handling. |
| **DOM Manipulation** | Modifying HTML element content and classes (`textContent`, `classList.add()`, `classList.remove()`). |
| **Event Handling** | Listening for user interactions via `addEventListener("click", ...)` and Enter keypresses. |

---

## 7. Test Cases & Expected Results

| Test Case | User Input | Expected Output | Status |
| :--- | :--- | :--- | :--- |
| **Test 1** | `Puducherry` | **29°C**, Partly Cloudy, Humidity: 78%, Wind Speed: 14 km/h, ⛅ | Passed |
| **Test 2** | `Chennai` | **32°C**, Sunny, Humidity: 65%, Wind Speed: 18 km/h, ☀️ | Passed |
| **Test 3** | `puducherry` | Matches `Puducherry` (Case-insensitive verification) | Passed |
| **Test 4** | `UnknownCity` | *"Weather data not available for this city."* | Passed |
| **Test 5** | *(Empty / Spaces)* | *"Please enter a city name."* | Passed |
| **Test 6** | Network/JSON Error | *"Unable to fetch weather data. Please try again."* | Passed |

---

## 8. IWT Lab Viva Explanation Guide

If asked by your laboratory examiner to explain your project, use this concise script:

> *"First, the user enters a city name. When the button is clicked, JavaScript intercepts the event without reloading the page. It uses the Fetch API to asynchronously request the `weather.json` file. The server returns weather data in JSON format. The response is converted into a JavaScript object using `response.json()`. Then, JavaScript searches for the requested city in a case-insensitive manner and dynamically updates the DOM elements using `document.getElementById()` and `textContent` to display the weather information without reloading the webpage."*
