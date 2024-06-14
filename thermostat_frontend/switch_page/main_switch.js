
import {get_device_configs, get_device_state } from "./device_data_backend_api.mjs";
import {turn_device_on, force_device_on} from "./switch_on_backend_api.mjs";
import {turn_device_off, force_device_off} from "./switch_off_backend_api.mjs" 
 
const forcedDivOn = document.getElementById("forced-turn-on");  
forcedDivOn.style.display = "None";

const forcedDivOff = document.getElementById("forced-turn-off");  
forcedDivOff.style.display = "None";

// get and display device data
get_device_state();   

// get and display device configs data 
get_device_configs();



// ON functions
async function turnOn() { 
    // hide opposite card's info for better visibility
    forcedDivOff.style.display = "None";  
    document.getElementById('off-message').innerHTML = "";

    const response_status = await turn_device_on();  
    if (response_status === 403){ 
        forcedDivOn.style.display = "block";
    } 
    else{ 
        forcedDivOn.style.display = "None";
    }
}; 

async function forcedTurnOn() { 
    forcedDivOff.style.display = "None";  
    document.getElementById('off-message').innerHTML = "";
    const response_status = await force_device_on();  
};


document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitchBtn = document.getElementById('on-btn');
    toggleSwitchBtn.addEventListener('click', function() {
        turnOn();
    });
}); 

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitchBtn = document.getElementById('forced-on-btn');
    toggleSwitchBtn.addEventListener('click', function() {
        forcedTurnOn();
    });
});

// OFF Functions
async function turnOff() {  
    // hide opposite card's info for better visibility
    forcedDivOn.style.display = "None";  
    document.getElementById('on-message').innerHTML = "";

    const response_status = await turn_device_off();  
    if (response_status === 403){ 
        forcedDivOff.style.display = "block";
    } 
    else{ 
        forcedDivOff.style.display = "None";
    }
}; 

async function forcedTurnOff() { 
    // hide opposite card's info for better visibility
    forcedDivOn.style.display = "None";  
    document.getElementById('on-message').innerHTML = "";
    const response_status = await force_device_off();  
};

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitchBtn = document.getElementById('off-btn');
    toggleSwitchBtn.addEventListener('click', function() {
        turnOff();
    });
}); 

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitchBtn = document.getElementById('forced-off-btn');
    toggleSwitchBtn.addEventListener('click', function() {
        forcedTurnOff();
    });
});







