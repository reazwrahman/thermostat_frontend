import {MODE, ENDPOINTS, SECRETS} from "../configs.js";  
import { post_thermostat_data_on, post_thermostat_data_off } from "./static_data/post_thermostat_data.js";
import { update_thermostat_data } from "./static_data/update_thermostat_data.js";
import { get_thermostat } from "./thermostat_status.js";

const thermostat_url = ENDPOINTS[MODE].THERMOSTAT_URL; 


// ----------------------------- ON FUNCTIONS ------------------------- //
// --------------------------------------------------------------------- //

async function turn_thermostat_on(device, target_temperature){   
    let data; 
    const dom = document.getElementById('thermostat-on-message');  
    let requestBody = {
        "switch_key": SECRETS.SWITCH_KEY, 
        "device": device, 
        "action": "ON",  
        "target_temperature": target_temperature
    }
    try {
        const response = await fetch(thermostat_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify(requestBody)
        }); 
        data = await response.json(); 
        data.url = thermostat_url;

    } catch (error) {
        console.warn('force_device_on::Error fetching data from backend api:', error); 
        console.log("force_device_on(): using static json data");
       
        data = post_thermostat_data; 
        data.url = "static sample data";
    }   
    finally{  
        display_message_thermostat_on(data); 
        get_thermostat();
    }
} 


function display_message_thermostat_on(data){  
    // clear the other two cards 
    document.getElementById('thermostat-off-message').innerHTML = ""; 
    document.getElementById('thermostat-update-message').innerHTML = "";

    const messageElement = document.getElementById('thermostat-on-message');
    messageElement.innerHTML = ''; 
    
    // Construct a string with key-value pairs
    let message = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            message = `${key}:  ${data[key]}`; 
            messageElement.innerHTML += message + "<br>"
        }
    }
}

// ----------------------------- OFF FUNCTIONS ------------------------- //
// --------------------------------------------------------------------- //

async function turn_thermostat_off(device){ 
    document.getElementById('thermostat-off-message').innerHTML = "Waiting for API response ..." 
    let data;  
    let requestBody = {
        "switch_key": SECRETS.SWITCH_KEY, 
        "device": device, 
        "action": "OFF", 
        "target_temperature": 0.0
    }
    try {
        const response = await fetch(thermostat_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify(requestBody)
        }); 
        data = await response.json(); 
        data.url = thermostat_url;

    } catch (error) {
        console.warn('turn_thermostat_off::Error fetching data from backend api:', error); 
        console.log("turn_thermostat_off(): using static json data");
       
        data = post_thermostat_data_off; 
        data.url = "static sample data";
    }   
    finally{  
        display_message_thermostat_off(data); 
        get_thermostat();
    }
} 


function display_message_thermostat_off(data){   
    // clear the other two cards 
    document.getElementById('thermostat-on-message').innerHTML = ""; 
    document.getElementById('thermostat-update-message').innerHTML = "";
    
    const messageElement = document.getElementById('thermostat-off-message');
    messageElement.innerHTML = ''; 

    
    // Construct a string with key-value pairs
    let message = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            message = `${key}: ${data[key]}`; 
            messageElement.innerHTML += message + "<br>"
        }
    }
};

// ----------------------------- UPDATE FUNCTIONS ------------------------- //
// --------------------------------------------------------------------- //

async function update_thermostat(device, target_temperature){
    let data;  
    let requestBody = {
        "switch_key": SECRETS.SWITCH_KEY, 
        "device": device, 
        "action": "UPDATE", 
        "target_temperature": target_temperature
    }
    try {
        const response = await fetch(thermostat_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify(requestBody)
        }); 
        data = await response.json(); 
        data.url = thermostat_url;

    } catch (error) {
        console.warn('update_thermostat::Error fetching data from backend api:', error); 
        console.log("update_thermostat(): using static json data");
       
        data = update_thermostat_data; 
        data.url = "static sample data";
    }   
    finally{  
        display_message_thermostat_update(data); 
        get_thermostat();
    }
} 


function display_message_thermostat_update(data){   
    // clear the other two cards 
    document.getElementById('thermostat-on-message').innerHTML = ""; 
    document.getElementById('thermostat-off-message').innerHTML = "";

    const messageElement = document.getElementById('thermostat-update-message');
    messageElement.innerHTML = ''; 

    // Construct a string with key-value pairs
    let message = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            message = `${key}: ${data[key]}`; 
            messageElement.innerHTML += message + "<br>"
        }
    }
};




export{turn_thermostat_on, turn_thermostat_off, update_thermostat};