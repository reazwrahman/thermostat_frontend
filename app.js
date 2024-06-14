
import { success_call_back, error_call_back, display_weather_card } from "./weather_api.mjs"; 
import { get_health,get_device_state, get_thermostat } from "./backend_api.mjs";


// display weather card information (Uses real weather api)
/*if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success_call_back, error_call_back);
} else {
    // Handle the case where browser doesn't support geolocation
    console.warn("Geolocation is not supported by this browser.");
}*/

// uses static json data (test code, comment it out to use the actual weather api above)
display_weather_card();

//display health data
get_health();

// display sensor reading and device state data 
get_device_state(); 

// display thermostat data 
get_thermostat();