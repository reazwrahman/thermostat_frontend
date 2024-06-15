import {MODE, ENDPOINTS, SECRETS} from "../configs.js"; 
import { device_configs_data } from "./static_data/device_configs_data.js" 
import { device_state_data } from "./static_data/device_state_data.js";


const device_state_url = ENDPOINTS[MODE].DEVICE_STATE_URL; 
const device_configs_url = ENDPOINTS[MODE].CONFIGS_URL;

async function get_device_state(){  
    let data; 
    try {
        const response = await fetch(device_state_url);
        data = await response.json();
    } catch (error) {
        console.warn('Error fetching device state data from backend api:', error); 
        console.log("get_device_state(): using static json data");
        data = device_state_data;
    }  
    finally{ 
        display_device_data(data);  
    }
} 

async function get_device_configs(){  
    let data; 
    try {
        const response = await fetch(device_configs_url);
        data = await response.json();
    } catch (error) { 
        console.warn('Error fetching device config data from backend api:', error); 
        console.log("get_device_configs(): using static json data");
        data = device_configs_data;
    }  
    finally{ 
        display_device_configs(data);  
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
} 

function display_device_configs(data){

    const configs_card = document.getElementById("device-configs-card");  

    configs_card.innerHTML = `
        <h3>Device Configs</h3>   
        <p>Cooldown Period: ${data.cool_down_period} minute(s)</p>
        <p>Max On Time: ${data.maximum_on_time} minute(s)</p> 
        <p>Min On Time: ${data.minimum_on_time} minute(s)</p>  
        <p>Running Mode: ${data.running_mode}</p> 
    `; 
} 

export {get_device_state, get_device_configs};