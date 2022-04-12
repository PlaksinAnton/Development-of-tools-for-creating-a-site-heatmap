import React, { useEffect, useState } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryLabel,
  VictoryTooltip,
} from "victory";
import axios from "axios";
import h337 from "heatmap.js";

function WindowHeatMap(props) {
  return (
    <div class="heatmap-pic">
      <div className="heatmap-iframe">
        <iframe
          allowTransparency
          class="heatmap-home"
          id="heatmap-home"
          src="http://localhost:3000/"
          height="1000px"
        ></iframe>
      </div>
    </div>
  );
}

function WindowGraphs(props) {
  return (
    <div class="victorypie">
      <div class="graph-description">
        <p>Зависимость количества кликов от типа браузера</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}></div>
    </div>
  );
}

function FiltersHeatMap(props) {
  return (
    <div className="filter">
      <h1 class="filter-text">Тепловая карта сайта</h1>
      <button
        className="filter-button graphs-button__first graphs-button__first--anim"
        onClick={ViewHeatMap}
      >
        Фильтр по кликам
      </button>
      <div className="filter-label">
        <div className="filter-label__first">
          <label class="filter-label__style" for="page">
            Выберите страницу
          </label>
          <select id="page" className="choose choosePage" onChange={ChoosePage}>
            <option value="home" selected>
              Home
            </option>
            <option value="grid">Grid</option>
            <option value="product">Product</option>
          </select>
        </div>
        <div className="filter-label__second">
          <label class="filter-label__style" for="browser">
            Фильтр по браузеру
          </label>
          <select
            id="browser"
            className="choose chooseBrowser"
            onChange={Change}
          >
            <option value="">Сделайте выбор</option>
            {props.browsers}
          </select>
        </div>
        <div className="filter-label__third">
          <label class="filter-label__style" for="browser">
            Фильтр по гаджету
          </label>
          <select
            id="browser"
            className="choose chooseGadget"
            onChange={Change}
          >
            <option value="">Сделайте выбор</option>
            {props.gadgets}
          </select>
        </div>
        <div className="filter-label__fourth">
          <label class="filter-label__style" for="browser">
            Фильтр по ОС
          </label>
          <select id="browser" className="choose chooseOS" onChange={Change}>
            <option value="">Сделайте выбор</option>
            {props.os}
          </select>
        </div>
      </div>
    </div>
  );
}

function ViewFilterHeatmap(dataForHeatMap, page) {
  let data = {
    max: 15,
    min: 0,
    data: dataForHeatMap,
  };

  let heatmap = document
    .querySelector(".heatmap-home")
    .contentDocument.querySelector("canvas");
  if (heatmap != null) {
    heatmap.remove();
  }
  let heatmapInstance = h337.create({
    container: document
      .querySelector(".heatmap-home")
      .contentDocument.querySelector("." + page),
  });
  heatmapInstance.setData(data);
}

function ViewManyFilters(choiceBr, choiceGg, choiceOs, page) {
  axios
    .get(
      `http://127.0.0.1:5000/get_smart_heatmap/page/${page}/browser/${choiceBr}/gadget_type/${choiceGg}/OS/${choiceOs}`
    )
    .then((response) => {
      let data = response.data.data;
      ViewFilterHeatmap(data, page);
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}

function Change() {
  let choiceBr = document.querySelector(".chooseBrowser").value;
  let choiceGg = document.querySelector(".chooseGadget").value;
  let choiceOs = document.querySelector(".chooseOS").value;

  if (choiceBr == "" && choiceGg == "" && choiceOs == "") {
    if (
      document
        .querySelector(".heatmap-home")
        .contentDocument.querySelector("canvas") != null
    ) {
      document
        .querySelector(".heatmap-home")
        .contentDocument.querySelector("canvas")
        .remove();
    }
    return;
  }

  let myFrame = document.getElementById("heatmap-home");
  let name = myFrame.getAttribute("src");
  let page = "";
  if (name == "http://localhost:3000/") {
    page = "home";
  } else if (name == "http://localhost:3000/grid") {
    page = "grid";
  } else {
    page = "product";
  }

  if (choiceBr == "") {
    choiceBr = "None";
  }
  if (choiceGg == "") {
    choiceGg = "None";
  }
  if (choiceOs == "") {
    choiceOs = "None";
  }
  ViewManyFilters(choiceBr, choiceGg, choiceOs, page);
}

function ViewHeatMap() {
  let myFrame = document.getElementById("heatmap-home");
  let name = myFrame.getAttribute("src");
  let page = "";
  if (name == "http://localhost:3000/") {
    page = "home";
  } else if (name == "http://localhost:3000/grid") {
    page = "grid";
  } else {
    page = "product";
  }
  axios
    .get(
      `http://127.0.0.1:5000/get_smart_heatmap/page/${page}/browser/None/gadget_type/None/OS/None`
    )
    .then((response) => {
      let dataPoints = response.data.data;
      let data = {
        max: 15,
        min: 0,
        data: dataPoints,
      };
      let heatmap = document
        .querySelector(".heatmap-home")
        .contentDocument.querySelector("canvas");
      if (heatmap != null) {
        heatmap.remove();
      }
      let heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector("." + page),
      });
      heatmapInstance.setData(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function FiltersGraphs(props) {
  return <h1>Graphs</h1>;
}

function ChoosePage() {
  let select = document.querySelector(".choosePage");
  let myFrame = document.getElementById("heatmap-home");
  let choice = select.value;

  switch (choice) {
    case "home":
      myFrame.setAttribute("src", "http://localhost:3000/");
      break;
    case "grid":
      myFrame.setAttribute("src", "http://localhost:3000/grid");
      break;
    case "product":
      myFrame.setAttribute("src", "http://localhost:3000/product");
      break;
    default:
  }
}

class GraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onHeatMap = this.onHeatMap.bind(this);
    this.onGraphs = this.onGraphs.bind(this);
    this.state = {
      isHeatMap: true,
      browsers: undefined,
      gadgets: undefined,
      os: undefined,
    };
  }
  componentDidMount() {
    axios
      .all([
        axios.get(`http://127.0.0.1:5000/get_list_of/browser`),
        axios.get(`http://127.0.0.1:5000/get_list_of/gadget_type`),
        axios.get(`http://127.0.0.1:5000/get_list_of/OS`),
      ])
      .then((response) => {
        // for browsers
        let browsers = [];
        let dataBr = response[0].data.data;
        for (let i = 0; i < dataBr.length; i++) {
          browsers.push(dataBr[i][i + 1]);
        }
        const browsersItems = browsers.map((browser) => (
          <option value={browser}>{browser}</option>
        ));
        // for gadgets
        let gadgets = [];
        let dataGg = response[1].data.data;
        for (let i = 0; i < dataGg.length; i++) {
          gadgets.push(dataGg[i][i + 1]);
        }
        const gadgetsItems = gadgets.map((gadget) => (
          <option value={gadget}>{gadget}</option>
        ));
        // for os
        let os = [];
        let dataOs = response[2].data.data;
        for (let i = 0; i < dataOs.length; i++) {
          os.push(dataOs[i][i + 1]);
        }
        const osItems = os.map((o) => <option value={o}>{o}</option>);
        this.setState({
          browsers: browsersItems,
          gadgets: gadgetsItems,
          os: osItems,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onHeatMap() {
    this.setState({ isHeatMap: true });
  }
  onGraphs() {
    this.setState({ isHeatMap: false });
  }

  render() {
    // choose graphs or heatmap logic
    const isHeatMap = this.state.isHeatMap;
    let window = null;
    let filters = null;
    if (isHeatMap) {
      filters = (
        <FiltersHeatMap
          browsers={this.state.browsers}
          gadgets={this.state.gadgets}
          os={this.state.os}
        />
      );
      window = <WindowHeatMap />;
    } else {
      window = <WindowGraphs />;
    }

    return (
      <section className="graphs">
        <div className="graphs-container">
          <div className="graphs-buttons">
            <button
              class="graphs-button__first graphs-button__first--anim"
              onClick={this.onHeatMap}
            >
              <span>Теловая карта</span>
            </button>
            <button
              class="graphs-button__first graphs-button__first--anim"
              onClick={this.onGraphs}
            >
              <span>Графики</span>
            </button>
          </div>
          <div className="graphs-main-content">
            <div className="graphs-filters">{filters}</div>
            <div className="graphs-window">{window}</div>
          </div>
        </div>
      </section>
    );
  }
}
export default GraphContainer;
