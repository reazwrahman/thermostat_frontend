import { get_thermostat } from "./thermostat_status.js";
import { turn_thermostat_on, turn_thermostat_off, update_thermostat } from "./thermostat_backend_api.mjs";
import { update_thermostat_data } from "./static_data/update_thermostat_data.js";

// display thermostat status data 
get_thermostat();


// populate temperature drop down
document.addEventListener('DOMContentLoaded', function () {
    const temperatureSelectOn = document.getElementById('temperature-select-on'); 
    const temperatureSelectUpdate = document.getElementById('temperature-select-update');

    // Populate select with values from 10 to 35 in increments of 0.5
    for (let i = 15; i <= 30; i += 0.2) {
        const optOn = document.createElement('option');
        optOn.value = i;
        optOn.textContent = i;
        temperatureSelectOn.appendChild(optOn);  

        const optUpdate = document.createElement('option');
        optUpdate.value = i;
        optUpdate.textContent = i;
        temperatureSelectUpdate.appendChild(optUpdate);
    }
});


// react to on action
document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitchBtn = document.getElementById('on-btn');
    toggleSwitchBtn.addEventListener('click', function () {
        let device = document.getElementById("device-select-on").value;
        let target_temperature = document.getElementById("temperature-select-on").value;
        turn_thermostat_on(device, target_temperature);
    });
}); 


// react to off action
document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitchBtn = document.getElementById('off-btn');
    toggleSwitchBtn.addEventListener('click', function () {
        let device = document.getElementById("device-select-off").value;
        turn_thermostat_off(device);
    });
}); 

// react to update action 
// react to off action
document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitchBtn = document.getElementById('update-btn');
    toggleSwitchBtn.addEventListener('click', function () {
        let device = document.getElementById("device-select-update").value; 
        let target_temperature = document.getElementById("temperature-select-update").value;
        update_thermostat(device, target_temperature);
    });
});