import {MODE, ENDPOINTS, SECRETS} from "../configs.js";  
import { get_device_state } from "./device_data_backend_api.mjs";
import { static_turn_off_data } from "./static_data/turn_off_data.js"; 
import { static_forced_off_data } from "./static_data/forced_off_data.js";


const turn_off_url = ENDPOINTS[MODE].TURN_OFF_URL; 
const forced_off_url = ENDPOINTS[MODE].FORCED_OFF_URL;   

const requestBody = {
    "switch_key": SECRETS.SWITCH_KEY
};


async function turn_device_off(){ 
    const dom = document.getElementById('off-message');   
    let data;
    try {
        const response = await fetch(turn_off_url); 
        const response_clone = response.clone();
        data = await response.json(); 
        data.url = turn_off_url; 
        return response_clone.status;
    } catch (error) {
        console.warn('turn_device_off::Error fetching data from backend api:', error); 
        console.log("turn_device_off(): using static json data");
       
        data = static_turn_off_data; 
        data.url = "static sample data";
        return 403;
    }   
    finally{  
        get_device_state();
        display_message_off(data);
    }
}

function display_message_off(data){  
    const messageElement = document.getElementById('off-message'); 
    messageElement.innerHTML = ""; 
    document.getElementById('forced-off-message').innerHTML = "";

    // Construct a string with key-value pairs
    let message = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            message = `${key}: ${data[key]}`; 
            messageElement.innerHTML += message + "<br>"
        }
    }
}

async function force_device_off(){   
    let data; 
    const dom = document.getElementById('forced-off-message'); 
    try {
        const response = await fetch(forced_off_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }); 
        data = await response.json(); 
        data.url = forced_off_url;

    } catch (error) {
        console.warn('force_device_off::Error fetching data from backend api:', error); 
        console.log("force_device_off(): using static json data");
       
        data = static_forced_off_data; 
        data.url = "static sample data";
    }   
    finally{  
        get_device_state();
        display_message_forced_off(data);
    }
} 


function display_message_forced_off(data){  
    const messageElement = document.getElementById('forced-off-message'); 
    document.getElementById('forced-off-message').innerHTML = "";

    // Construct a string with key-value pairs
    let message = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            message = `${key}: ${data[key]}`; 
            messageElement.innerHTML += message + "<br>"
        }
    }
}

export{turn_device_off, force_device_off};