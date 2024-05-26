const api_key = '8a757115f1d5c68d542ff30473fdf820';

 
async function get_weather_info(latitude, longitude) { 

    const weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`;

    try {
        const response = await fetch(weather_api_url);
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error); 
        const response = await fetch("./static_data/weather_data.json");  
        data = await response.json(); 
        return data;
    }
} 

async function display_weather_card(latitude, longitude, use_static_data = False)  
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
    
    const parsed_data = { 
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description, 
        feels_like: data.main.feels_like, 
        humidity: data.main.humidity
    };
    
    card.innerHTML = `
        <h3>Weather Info</h3>  
        <p>Location: ${parsed_data.location}</p> 
        <p>Description: ${parsed_data.description}</p> 
        <p>Temperature: ${parsed_data.temperature}°C</p>
        <p>Feels like: ${parsed_data.feels_like}ºC</p> 
        <p>Humidity: ${parsed_data.humidity}%</p>

    `; 
}


// Geolocation Logic (from previous examples)
function success_call_back(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
 
    //locationInfo.textContent = `Your location: Latitude: ${latitude}, Longitude: ${longitude}`;
    display_weather_card(latitude, longitude);  
}
 
function error_call_back(error) {
    // Handle potential geolocation errors (from previous examples)
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationInfo.textContent = "User denied geolocation permission.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationInfo.textContent = "Location information unavailable.";
            break;
        case error.TIMEOUT:
            locationInfo.textContent = "Geolocation request timed out.";
            break;
        default:
            locationInfo.textContent = "An unknown error occurred.";
            break;
    }
}
 
export {success_call_back, error_call_back, display_weather_card};
