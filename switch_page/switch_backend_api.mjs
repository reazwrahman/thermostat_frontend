import {MODE, ENDPOINTS} from "../configs.js";

const device_state_url = ENDPOINTS[MODE].DEVICE_STATE_URL;


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
} 

export{get_device_state};