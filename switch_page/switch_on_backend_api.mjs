import {MODE, ENDPOINTS, SECRETS} from "../configs.js"; 
import { static_turn_on_data } from "./static_data/turn_on_data.js"; 
import { static_forced_on_data } from "./static_data/forced_on_data.js";
import { get_device_state } from "./device_data_backend_api.mjs";


const turn_on_url = ENDPOINTS[MODE].TURN_ON_URL; 
const forced_on_url = ENDPOINTS[MODE].FORCED_ON_URL;    

const requestBody = {
    "switch_key": SECRETS.SWITCH_KEY
};




async function turn_device_on(){ 
    const dom = document.getElementById('on-message');   
    let data;
    try {
        const response = await fetch(turn_on_url); 
        const response_clone = response.clone();
        data = await response.json(); 
        data.url = turn_on_url; 
        return response_clone.status;
    } catch (error) {
        console.warn('turn_device_on::Error fetching data from backend api:', error); 
        console.log("turn_device_on(): using static json data");
       
        data = static_turn_on_data; 
        data.url = "static sample data";
        return 200;
    }   
    finally{  
        get_device_state();
        display_message_on(data);
    }
}

function display_message_on(data){  
    const messageElement = document.getElementById('on-message'); 
    messageElement.innerHTML = ""; 
    document.getElementById('forced-on-message').innerHTML = "";

    // Construct a string with key-value pairs
    let message = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            message = `${key}: ${data[key]}`; 
            messageElement.innerHTML += message + "<br>"
        }
    }
}

async function force_device_on(){   
    let data; 
    const dom = document.getElementById('forced-on-message'); 
    try {
        const response = await fetch(forced_on_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }); 
        data = await response.json(); 
        data.url = forced_on_url;

    } catch (error) {
        console.warn('force_device_on::Error fetching data from backend api:', error); 
        console.log("force_device_on(): using static json data");
       
        data = static_forced_on_data; 
        data.url = "static sample data";
    }   
    finally{  
        get_device_state();
        display_message_forced_on(data);
    }
} 


function display_message_forced_on(data){  
    const messageElement = document.getElementById('forced-on-message'); 
    document.getElementById('forced-on-message').innerHTML = "";

    // Construct a string with key-value pairs
    let message = '';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            message = `${key}: ${data[key]}`; 
            messageElement.innerHTML += message + "<br>"
        }
    }
}

export{turn_device_on, force_device_on};