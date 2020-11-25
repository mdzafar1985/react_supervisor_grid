import React from "react";
import "./App.css";
import SUPERVISOR_GRID from "./component/data_grid";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  render() {
    return (
      <div class="container">
        <ul class="nav nav-tabs">
          <li class="active">
            <a data-toggle="tab" href="#home">
              UNASSIGNED TASKS
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#menu1">
              ASSIGNED TASKS
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#menu2">
              ALL TASKS
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div id="home" class="tab-pane fade in active">
            <SUPERVISOR_GRID />
          </div>
          <div id="menu1" class="tab-pane fade"></div>
          <div id="menu2" class="tab-pane fade"></div>
        </div>
      </div>
    );
  }
}

export default App;
