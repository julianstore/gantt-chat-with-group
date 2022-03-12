import React, { Component } from "react";
import { gantt } from "dhtmlx-gantt";
import $ from "jquery";
import "jquery-contextmenu";
import "jquery-contextmenu/src/sass/jquery.contextMenu.scss";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

export default class Gantt extends Component {
  constructor(props) {
    super(props);
    this.initZoom();
  }

  // instance of gantt.dataProcessor
  dataProcessor = null;

  initZoom() {
    gantt.ext.zoom.init({
      levels: [
        {
          name: "Hours",
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: "day", step: 1, format: "%d %M" },
            { unit: "hour", step: 6, format: "%H" }
          ]
        },
        {
          name: "Days",
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "week", step: 1, format: "Week #%W" },
            { unit: "day", step: 1, format: "%d %M" }
          ]
        },
        {
          name: "Months",
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "month", step: 1, format: "%F" },
            { unit: "week", step: 1, format: "#%W" }
          ]
        }
      ]
    });
  }

  setZoom(value) {
    gantt.ext.zoom.setLevel(value);
  }

  initGanttDataProcessor() {
    /**
     * type: "task"|"link"
     * action: "create"|"update"|"delete"
     * item: data object object
     */
    const onDataUpdated = this.props.onDataUpdated;
    this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(type, action, item, id);
        }

        // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
        // resolve({id: databaseId});
        return resolve();
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidMount() {
    gantt.plugins({
      multiselect: true,
      tooltip: false
    });

    gantt.config.layout = {
      css: "gantt_container",
      rows: [
        {
          cols: [
            { view: "grid", group: "grids", scrollY: "scrollVer" },
            { resizer: true, width: 3 },
            { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
            { view: "scrollbar", id: "scrollVer", group: "vertical" }
          ],
          gravity: 2
        },
        { view: "scrollbar", scroll: "x", id: "scrollHor", height: 20 }
      ]
    };

    gantt.config.xml_date = "%d-%m-%Y %H:%i";
    gantt.config.multiselect = true;
    gantt.config.reorder_grid_columns = true;

    const { tasks } = this.props;
    gantt.init(this.ganttContainer);
    this.initGanttDataProcessor();
    gantt.parse(tasks);

    gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
      if (
        task.start_date <= gantt.getState().min_date ||
        task.end_date >= gantt.getState().max_date
      ) {
        gantt.render();
      }
    });

    gantt.attachEvent("onGanttScroll", function (left, top) {
      let visible_tasks = gantt.getVisibleTaskCount();
      let last_visible_task = gantt.getTaskByIndex(visible_tasks - 1);

      if (gantt.getTaskRowNode(last_visible_task.id)) {
        // gantt.message("Loading new tasks");
        var amount = 10;
        var tasks = [];
        for (var i = 1; i < amount; i++) {
          tasks.push({
            id: gantt.uid(),
            text: "Workstation" + Math.random(),
            start_date: "01-04-2021",
            order: "10",
            progress: 0.2,
            open: true,
            priority: 0,
            project: 1,
            color: "green"
          });
        }
        gantt.parse({ data: tasks });
      }
    });

    gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
      $($(event.target)[0].parentElement).contextMenu({
        selector: "div.gantt_task_content",
        reposition: false,
        callback: function (key, options) {
          var m = "clicked: " + key + " on " + $(this).text();
          alert(m + "  " + taskId);
        },
        items: {
          edit: { name: "Edit" },
          cut: { name: "Cut" },
          copy: { name: "Copy" },
          paste: { name: "Paste" },
          delete: { name: "Delete" },
          sep1: "---------",
          quit: {
            name: "Quit"
          }
        },
        animation: { duration: 150, show: "fadeIn", hide: "fadeOut" }
      });
      return false;
    });
  }

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor();
      this.dataProcessor = null;
    }
  }

  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <div
        ref={(input) => {
          this.ganttContainer = input;
        }}
        style={{ width: "100%", height: "100%" }}
      ></div>
    );
  }
}
