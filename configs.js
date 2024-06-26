
const RUNNING_MODES = { 
    SIM: "SIMULATION", 
    TARGET: "TARGET"
} 

const MODE = RUNNING_MODES.SIM

const SECRETS= { 
    WEATHER_API_KEY: "8a757115f1d5c68d542ff30473fdf820",
    SWITCH_KEY: "" 
}

const laptop_ip = "192.168.1.37:8080"; 
const raspberry_ip = "192.168.1.209:8080"; 

const ENDPOINTS= { 
    [RUNNING_MODES.SIM]:{ 
        HEALTH_URL: `http://${laptop_ip}/health`, 
        DEVICE_STATE_URL: `http://${laptop_ip}/currentState`, 
        STATE_HISTORY_URL: `http://${laptop_ip}/stateHistory`, 
        ERROR_LOG_URL: `http://${laptop_ip}/errorLogs`, 
        TURN_ON_URL: `http://${laptop_ip}/gameSetup/on`, 
        FORCED_ON_URL: `http://${laptop_ip}/gameSetup/forcedOn`,  
        TURN_OFF_URL: `http://${laptop_ip}/gameSetup/off`, 
        FORCED_OFF_URL: `http://${laptop_ip}/gameSetup/forcedOff`, 
        THERMOSTAT_URL: `http://${laptop_ip}/gameSetup/thermostat`, 
        CONFIGS_URL: `http://${laptop_ip}/deviceConfigs`
    }, 
    
    [RUNNING_MODES.TARGET]:{ 
        HEALTH_URL: `http://${raspberry_ip}/health`, 
        DEVICE_STATE_URL: `http://${raspberry_ip}/currentState`, 
        STATE_HISTORY_URL: `http://${raspberry_ip}/stateHistory`, 
        ERROR_LOG_URL: `http://${raspberry_ip}/errorLogs`, 
        TURN_ON_URL: `http://${raspberry_ip}/gameSetup/on`, 
        FORCED_ON_URL: `http://${raspberry_ip}/gameSetup/forcedOn`, 
        TURN_OFF_URL: `http://${raspberry_ip}/gameSetup/off`, 
        FORCED_OFF_URL: `http://${raspberry_ip}/gameSetup/forcedOff`, 
        THERMOSTAT_URL: `http://${raspberry_ip}/gameSetup/thermostat`, 
        CONFIGS_URL: `http://${raspberry_ip}/deviceConfigs`
    }
}  

export{ MODE, ENDPOINTS, SECRETS }; 
