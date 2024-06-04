
import { ENDPOINTS, MODE } from "../configs.js";


// for laptop (sim)
const error_log_url = ENDPOINTS[MODE].ERROR_LOG_URL;

async function get_error_log(){   
    let response; 
    let body;
    try {
        response = await fetch(error_log_url);  
        body = await response.json();
    } catch (error) {   
        console.error('Error fetching error logs:', error); 
        response = await fetch("./static_data/error_log.json");  
        body = await response.json();
        
    } 
    finally{ 
        display_data(body);
    }
}

function display_data(json_data){    
    const table_body = document.querySelector("#data-table tbody");

    json_data.forEach(item => {
        const row = document.createElement("tr");
        
        Object.values(item).forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value !== null ? value : 'N/A';
            row.appendChild(cell);
        });

        table_body.appendChild(row);
    }); 
} 

export {get_error_log};