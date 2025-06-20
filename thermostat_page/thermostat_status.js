import {MODE, ENDPOINTS} from "../configs.js";

const thermostat_url = ENDPOINTS[MODE].THERMOSTAT_URL;

async function get_thermostat(){   
    let response; 
    let body;
    try { 
        response = await fetch(thermostat_url);  
        body = await response.json(); 
        body.url = thermostat_url;
    } catch (error) {   
        console.warn('Error fetching thermostat data:', error); 
        response = await fetch("./static_data/thermostat_data.json"); 
        body = await response.json(); 
        body.url = "sample static data";
    } 
    finally{ 
        display_thermostat_data(body);
    }
} 

function display_thermostat_data(response){ 
    const health_card = document.getElementById("thermostat-status");  
    health_card.innerHTML = `
        <h3>Thermostat Status </h3>  
        <p>Heater: ${response.thermo_thread}</p> 
        <p>AC: ${response.ac_thread}</p>   
        <p>FAN: ${response.fan_thread}</p>  
        <p>Current Temperature: ${response.current_temperature} °C</p>
        <p>Target Temperature: ${response.target_temperature} °C</p>  
        <p>Last Updated On: ${response.updated_on}</p>
    `;  
} 

export {get_thermostat, display_thermostat_data};