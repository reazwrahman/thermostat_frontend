
function NavBar() {
    return (
      <nav className="navbar">
        <a href="/thermostat_frontend/index.html">
          <img src="/thermostat_frontend/logo.jpeg" alt="Logo" className="navbar-logo" />
        </a>
        <ul className="menu">
          <li>
            <a href="/thermostat_frontend/switch_page/index.html" className="dropdown-item">Device Switch</a>
          </li>
          <li>
            <a href="/thermostat_frontend/thermostat_page/thermostat_index.html" className="menu-item" tabIndex="0">Thermostat</a>
          </li>
          <li>
            <a href="/thermostat_frontend/power_cycle_page/power_cycle_index.html" className="menu-item" tabIndex="0">PowerCycle</a>
          </li>
          <li className="menu-item" tabIndex="0">
            Troubleshoot
            <ul className="dropdown">
              <li>
                <a href="/thermostat_frontend/state_history_page/state_history_index.html" className="dropdown-item">State Transitions</a>
              </li>
              <li>
                <a href="/thermostat_frontend/error_log_page/error_log_index.html" className="dropdown-item">Error Logs</a>
              </li>
            </ul>
          </li>
          <li className="menu-item" tabIndex="0">
            Background
            <ul className="dropdown">
            <li>
                <a href="/thermostat_frontend/background_pages/context_page/index.html" className="dropdown-item">Context</a>
              </li>
              <li>
                <a href="/thermostat_frontend/background_pages/hardware_page/index.html" className="dropdown-item">Hardware</a>
              </li>
              <li>
                <a href="/thermostat_frontend/background_pages/sensor_experiment_page/index.html" className="dropdown-item">Sensor Experiment</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
};

ReactDOM.render(<NavBar/>, document.getElementById('navbar'))