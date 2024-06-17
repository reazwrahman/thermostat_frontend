import { SECRETS } from "./configs.js";

const api_key = SECRETS.WEATHER_API_KEY;
//const api_key = "123";


// coordinates for Queens, NYC
const LATITUDE = 40.683961 
const LONGITUDE = -73.817874
 
async function get_weather_info(latitude=LATITUDE, longitude=LONGITUDE) { 
    let card = document.getElementById("weather-card");
    const weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;
    try {
        const response = await fetch(weather_api_url);
        const data = await response.json(); 
        data.source = "Open Weather Map API"
        return data;
    } catch (error) {
        console.warn('Error fetching weather data:', error); 
        const response = await fetch("./static_data/weather_data.json");  
        data = await response.json();  
        data.source = "Unable to get response from Weather API, using sample static data";
        return data;
    }
} 

async function display_weather_card(latitude, longitude, use_static_data = false)  
{  
    let data;
    const card = document.getElementById("weather-card");

    if (use_static_data){ 
        const response = await fetch("./static_data/weather_data.json");  
        data = await response.json(); 
    }
    else{ 
        data = await get_weather_info(latitude, longitude);  
    }
    console.log(data); 
    try{
        const parsed_data = { 
            source: data.source, 
            location: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description, 
            feels_like: data.main.feels_like, 
            humidity: data.main.humidity
        };
        
        card.innerHTML = `
            <h3>Weather Info</h3>   
            <p>Source: ${parsed_data.source}</p>
            <p>Location: ${parsed_data.location}</p> 
            <p>Description: ${parsed_data.description}</p> 
            <p>Temperature: ${parsed_data.temperature}°C</p>
            <p>Feels like: ${parsed_data.feels_like}ºC</p> 
            <p>Humidity: ${parsed_data.humidity}%</p>

        `; 
    } catch (error) { 
        card.innerHTML = `
            <h3>Weather Info</h3>   
            <p>Unable to get weather information </p>
            <p>Make sure to provide a valid API key </p>`;
        
    }
}


// Geolocation Logic (from previous examples)
function success_call_back(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
 
    display_weather_card(latitude, longitude);  
}
 
function error_call_back(error) {
    // Handle potential geolocation errors (from previous examples)
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied geolocation permission."); 
            console.log("Using preset location coordinates");
            display_weather_card();
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information unavailable.");
            break;
        case error.TIMEOUT:
            console.log("Geolocation request timed out.");
            break;
        default:
            console.log("An unknown error occurred.");
            break;
    }
}
 
export {success_call_back, error_call_back, display_weather_card};
