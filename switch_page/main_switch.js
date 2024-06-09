import { get_device_state } from "./switch_backend_api.mjs";

const forcedDiv = document.getElementById("forced-turn-on");  
forcedDiv.style.display = "None";

// get and display device data
get_device_state();  


export function turnOn() {
    const messageElement = document.getElementById('on-message');
    const currentMessage = messageElement.textContent;

    // Toggle message based on current state
    if (currentMessage === '') {
      messageElement.textContent = 'Switch toggled!'; 
      const secondDiv = document.getElementById("forced-turn-on"); 
      secondDiv.style.display = 'block';

    } else {
      messageElement.textContent = '';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitchBtn = document.getElementById('toggle-switch-btn');
    toggleSwitchBtn.addEventListener('click', function() {
        turnOn();
    });
});



