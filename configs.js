
const RUNNING_MODES = { 
    SIM: "SIM", 
    TARGET: "TARGET"
} 

const MODE = RUNNING_MODES.SIM

const SECRETS= { 
    WEATHER_API_KEY: "", 
}

const laptop_ip = "192.168.1.37:8080"; 
const raspberry_ip = "192.168.1.209:8080"; 

const ENDPOINTS= { 
    [RUNNING_MODES.SIM]:{ 
        HEALTH_URL: `http://${laptop_ip}/health`, 
        DEVICE_STATE_URL: `http://${laptop_ip}/currentState`, 
        STATE_HISTORY_URL: `http://${laptop_ip}/stateHistory`, 
        ERROR_LOG_URL: `http://${laptop_ip}/errorLogs`
    }, 
    
    [RUNNING_MODES.TARGET]:{ 
        HEALTH_URL: `http://${raspberry_ip}/health`, 
        DEVICE_STATE_URL: `http://${raspberry_ip}/state`, 
        STATE_HISTORY_URL: `http://${raspberry_ip}/stateHistory`, 
        ERROR_LOG_URL: `http://${raspberry_ip}/errorLogs`
    }
}  

export{ MODE, ENDPOINTS, SECRETS }; 