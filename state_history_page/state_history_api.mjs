
// for laptop
const state_history_url = `http://192.168.1.37:8080/stateHistory`;

// for the raspberry pi 
//const state_history_url = `http://192.168.1.209:8080/stateHistory`

async function get_state_history(){   
    let response; 
    let body;
    try {
        response = await fetch(state_history_url);  
        body = await response.json();
    } catch (error) {   
        console.error('Error fetching state history data:', error); 
        response = await fetch("./static_data/state_history.json");  
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

export {get_state_history};