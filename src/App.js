import React, { Component } from "react";
import Gantt from "./components/Gantt";
import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";
import "./App.css";

const data = {
  data: [
    {
      id: 1,
      text: "Office itinerancy",
      start_date: "01-04-2021",
      order: "10",
      progress: 0.4,
      open: true,
      priority: 0,
      project: 1,
      color: "yellow",
      dat: "who dat"
    },

    {
      id: 2,
      text: "Office facing",
      start_date: "02-04-2021",
      duration: "8",
      progress: 0.5,
      order: "10",
      progress: 0.6,
      parent: "1",
      open: true,
      priority: 1,
      color: "yellow"
    },
    {
      id: 3,
      text: "Furniture installation",
      start_date: "11-04-2021",
      duration: "8",
      order: "20",
      parent: "1",
      progress: 0.6,
      open: true,
      priority: 1
    },
    {
      id: 4,
      text: "The employee relocation",
      start_date: "13-04-2021",
      duration: "6",
      order: "30",
      parent: "1",
      progress: 0.5,
      open: true,
      priority: 1
    },

    {
      id: 5,
      text: "Interior office",
      start_date: "02-04-2021",
      duration: "7",
      order: "3",
      parent: "2",
      progress: 0.6,
      open: true,
      priority: 0
    },
    {
      id: 6,
      text: "Air conditioners check",
      start_date: "03-04-2021",
      duration: "7",
      order: "3",
      parent: "2",
      progress: 0.6,
      open: true,
      priority: 0
    },
    {
      id: 7,
      text: "Workplaces preparation",
      start_date: "11-04-2021",
      duration: "8",
      order: "3",
      parent: "3",
      progress: 0.6,
      open: true,
      priority: 0
    },
    {
      id: 8,
      text: "Preparing workplaces",
      start_date: "14-04-2021",
      duration: "5",
      order: "3",
      parent: "4",
      progress: 0.5,
      open: true,
      priority: 0
    },
    {
      id: 9,
      text: "Workplaces importation",
      start_date: "14-04-2021",
      duration: "4",
      order: "3",
      parent: "4",
      progress: 0.5,
      open: true,
      priority: 0
    },
    {
      id: 10,
      text: "Workplaces exportation",
      start_date: "14-04-2021",
      duration: "3",
      order: "3",
      parent: "4",
      progress: 0.5,
      open: true,
      priority: 0
    },

    {
      id: 11,
      text: "Product launch",
      order: "5",
      start_date: "14-04-2021",

      // progress: 0.6,
      open: true,
      priority: 2,
      project: 1,
      color: "purple"
    },

    {
      id: 12,
      text: "Perform Initial testing",
      start_date: "03-04-2021",
      duration: "5",
      order: "3",
      parent: "11",
      progress: 1,
      open: true,
      priority: 0,
      color: "purple"
    },
    {
      id: 13,
      text: "Development",
      start_date: "02-04-2021",
      duration: "7",
      order: "3",
      parent: "11",
      progress: 0.5,
      open: true,
      priority: 2,
      color: "orange"
    },
    {
      id: 14,
      text: "Analysis",
      start_date: "02-04-2021",
      duration: "6",
      order: "3",
      parent: "11",
      progress: 0.8,
      open: true,
      priority: 2,
      color: "orange"
    },
    {
      id: 15,
      text: "Design",
      start_date: "02-04-2021",
      duration: "5",
      order: "3",
      parent: "11",
      progress: 0.2,
      open: true,
      priority: 0,
      color: "orange"
    },
    {
      id: 16,
      text: "Documentation creation",
      start_date: "02-04-2021",
      duration: "7",
      order: "3",
      parent: "11",
      progress: 0,
      open: true,
      priority: 0,
      color: "green"
    },

    {
      id: 17,
      text: "Develop System",
      start_date: "03-04-2021",
      duration: "2",
      order: "3",
      parent: "13",
      progress: 1,
      open: true,
      priority: 2
    },
    {
      id: 18,
      text: "Integrate System",
      start_date: "06-04-2021",
      duration: "3",
      order: "3",
      parent: "13",
      progress: 0.8,
      open: true,
      priority: 2
    },
    {
      id: 19,
      text: "Test",
      start_date: "10-04-2021",
      duration: "4",
      order: "3",
      parent: "13",
      progress: 0.2,
      open: true,
      priority: 2
    },
    {
      id: 20,
      text: "Marketing",
      start_date: "10-04-2021",
      duration: "4",
      order: "3",
      parent: "13",
      progress: 0,
      open: true,
      priority: 2
    },

    {
      id: 21,
      text: "Design database",
      start_date: "03-04-2021",
      duration: "4",
      order: "3",
      parent: "15",
      progress: 0.5,
      open: true,
      priority: 0
    },
    {
      id: 22,
      text: "Software design",
      start_date: "03-04-2021",
      duration: "4",
      order: "3",
      parent: "15",
      progress: 0.1,
      open: true,
      priority: 0
    },
    {
      id: 23,
      text: "Interface setup",
      start_date: "03-04-2021",
      duration: "5",
      order: "3",
      parent: "15",
      progress: 0,
      open: true
    }
  ],
  links: [
    { id: "1", source: "1", target: "2", type: "1" },
    { id: "2", source: "2", target: "3", type: "0" },
    { id: "3", source: "3", target: "4", type: "0" },
    { id: "4", source: "2", target: "5", type: "2" },
    { id: "5", source: "2", target: "6", type: "2" },
    { id: "6", source: "3", target: "7", type: "2" },
    { id: "7", source: "4", target: "8", type: "2" },
    { id: "8", source: "4", target: "9", type: "2" },
    { id: "9", source: "4", target: "10", type: "2" },

    { id: "10", source: "11", target: "12", type: "1" },
    { id: "11", source: "11", target: "13", type: "1" },
    { id: "12", source: "11", target: "14", type: "1" },
    { id: "13", source: "11", target: "15", type: "1" },
    { id: "14", source: "11", target: "16", type: "1" },

    { id: "15", source: "13", target: "17", type: "1" },
    { id: "16", source: "17", target: "18", type: "0" },
    { id: "17", source: "18", target: "19", type: "0" },
    { id: "18", source: "19", target: "20", type: "0" },
    { id: "19", source: "15", target: "21", type: "2" },
    { id: "20", source: "15", target: "22", type: "2" },
    { id: "21", source: "15", target: "23", type: "2" }
  ]
};
class App extends Component {
  state = {
    currentZoom: "Days",
    messages: []
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessate = { message };
    const messages = [newMessate, ...this.state.messages];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : "";
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === "link" && action !== "delete") {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  };

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  };

  render() {
    const { currentZoom, messages } = this.state;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar zoom={currentZoom} onZoomChange={this.handleZoomChange} />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        {/* <MessageArea messages={messages} /> */}
      </div>
    );
  }
}

export default App;
