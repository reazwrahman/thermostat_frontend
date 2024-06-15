import {MODE, ENDPOINTS} from "./configs.js";

const health_url = ENDPOINTS[MODE].HEALTH_URL; 
const device_state_url = ENDPOINTS[MODE].DEVICE_STATE_URL; 
const thermostat_url = ENDPOINTS[MODE].THERMOSTAT_URL;

async function get_health(){   
    let response; 
    let response_clone;
    try {
        response = await fetch(health_url);  
        response_clone = response.clone();   
        const body = await response.json();
        response_clone.timestamp = body.timestamp;
    } catch (error) {   
        console.warn('Error fetching health data:', error); 
        response = await fetch("./static_data/health_data.json"); 
        response_clone = await response.json(); 
    } 
    finally{ 
        display_health_data(response_clone);
    }
}


function display_health_data(response){ 
    const health_card = document.getElementById("health-card");  
    health_card.innerHTML = `
        <h3>Backend API </h3>  
        <p>Health Status: ${response.statusText}</p> 
        <p>Status Code: ${response.status}</p>  
        <p>Last Updated On: ${response.timestamp}</p>
        <p>URL: ${response.url}</p> 
    `;  
}


async function get_device_state(){  
    let data; 
    try {
        const response = await fetch(device_state_url);
        data = await response.json();
    } catch (error) {
        console.warn('Error fetching device state data from backend api:', error); 
        console.log("get_device_state(): using static json data");
        const response = await fetch("./static_data/device_state_data.json");  
        data = await response.json();
    }  
    finally{ 
        display_device_data(data);  
    }
}

function display_device_data(data){

    const status_card = document.getElementById("device-status-card");  

    status_card.innerHTML = `
        <h3>Device Status</h3>  
        <p>Device Status: ${data.device_status}</p> 
        <p>Last Turned ON at: ${data.last_turned_on}</p> 
        <p>Last Turned OFF at: ${data.last_turned_off}</p> 
        <p>Last Updated On: ${data.timestamp}</p> 
    `;   

    if (data.device_status == "ON"){ 
        status_card.innerHTML += `<p>On for: ${data.on_for_minutes} minute(s)</p> `
    } 
    else{ 
        status_card.innerHTML += `<p>Off for: ${data.off_for_minutes} minute(s)</p> `
    };

    const sensor_card = document.getElementById("sensor-info-card");  

    sensor_card.innerHTML = `
        <h3>Sensor Readings</h3>  
        <p>Current Temperature: ${data.last_temperature} ºC</p> 
        <p>Current Humidity: ${data.last_humidity} %</p>  
        <p>Target Temperature: ${data.target_temperature} ºC</p>  
        <p>Last Updated On: ${data.timestamp}</p> 
    `; 
};

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
        <p>Thermostat (Heater): ${response.thermo_thread}</p> 
        <p>Thermostat (AC): ${response.ac_thread}</p> 
        <p>Target Temperature: ${response.target_temperature} °C</p>  
        <p>Last Updated On: ${response.updated_on}</p>
    `;  
}



export{get_health,get_device_state, get_thermostat};