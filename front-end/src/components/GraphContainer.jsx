import React, { useEffect, useState } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryScatter,
  VictoryLabel,
} from "victory";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import h337 from "heatmap.js";

function WindowHeatMap(props) {
  let len = String(document.location.href).length
  let src = String(document.location.href).slice(0, len - 5)
  return (
    <div class="heatmap-pic">
      <div className="heatmap-iframe">
        <iframe
          allowTransparency
          class="heatmap-home"
          id="heatmap-home"
          src={src}
          height="1000px"
        ></iframe>
      </div>
    </div>
  );
}

function Graph(props) {
  return (
    <div>
      <div style={{ width: "70vw" }} class="graph-description">
        <p>{props.descr}</p>
      </div>
      <div style={{ display: "flex" }}>
        <VictoryChart domainPadding={{ x: 50 }} theme={VictoryTheme.material}>
          <VictoryBar
            barWidth={20}
            style={{
              data: { fill: "#DCE775", width: 15 },
            }}
            data={props.graphData}
          />
          <VictoryScatter data={props.graphData} />
        </VictoryChart>
        <VictoryPie
          colorScale={["tomato", "orange", "gold", "cyan", "blue"]}
          data={props.graphData}
          labelRadius={({ innerRadius }) => innerRadius + 50}
        />
      </div>
    </div>
  );
}

const Table = (props) => {
  console.log(props.graphData)
  return (
    <div>
      <div style={{ width: "70vw" }} class="graph-description">
        <p>{props.descr}</p>
      </div>
      <div style={{ display: "flex", height: '500px', background: "#fff" }}>
        <DataGrid
          columns={[{ field: 'x', headerName: 'Site', width: 500 }, { field: 'y', headerName: 'Value', width: 500 }]}
          rows={props.graphData}
        />
      </div>
    </div>
  );
}

function WindowGraphs(props) {
  return (
    <div class="victorypie">
      <h1>Аналитика сайта</h1>
      <Graph
        descr="Зависимость количества кликов от типа браузера"
        graphData={props.graphBr}
      />
      <Graph
        descr="Зависимость количества кликов от типа устройства"
        graphData={props.graphGg}
      />
      <Graph
        descr="Зависимость количества кликов от времени, проведённом на сайте"
        graphData={props.graphTime}
      />
      <Graph
        descr="Зависимость количества кликов от страницы сайта"
        graphData={props.graphPage}
      />
      <Table
        descr="Зависимость количества кликов от страницы, с которой перешел пользователь"
        graphData={props.graphUrl}
      />
      <Graph
        descr="Зависимость количества кликов от операционной системы"
        graphData={props.graphOs}
      />
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
      `http://3.120.98.12/map/get_smart_heatmap/page/${page}/browser/${choiceBr}/gadget_type/${choiceGg}/OS/${choiceOs}`
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
  let len = String(document.location.href).length
  let src = String(document.location.href).slice(0, len - 5)
  let page = "";
  if (name == src) {
    page = "home";
  } else if (name == (src + "grid")) {
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
  let len = String(document.location.href).length
  let src = String(document.location.href).slice(0, len - 5)
  if (name == src) {
    page = "home";
  } else if (name == (src + "grid")) {
    page = "grid";
  } else {
    page = "product";
  }
  axios
    .get(
      `http://3.120.98.12/map/get_smart_heatmap/page/${page}/browser/None/gadget_type/None/OS/None`
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

function ChoosePage() {
  let select = document.querySelector(".choosePage");
  let len = String(document.location.href).length
  let myFrame = document.getElementById("heatmap-home");
  let choice = select.value;
  let src = String(document.location.href).slice(0, len - 5)

  switch (choice) {
    case "home":
      myFrame.setAttribute("src", src);
      break;
    case "grid":
      myFrame.setAttribute("src", src + "grid");
      break;
    case "product":
      myFrame.setAttribute("src", src + "product");
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
      graphBr: undefined,
      graphGg: undefined,
      graphTime: undefined,
      graphPage: undefined,
      graphUrl: undefined,
      graphOs: undefined,
    };
  }
  componentDidMount() {
    axios
      .all([
        axios.get(`http://3.120.98.12/map/get_list_of/browser`),
        axios.get(`http://3.120.98.12/map/get_list_of/gadget_type`),
        axios.get(`http://3.120.98.12/map/get_list_of/OS`),
        axios.get(`http://3.120.98.12/map/get_gist/browser`),
        axios.get("http://3.120.98.12/map/get_gist/gadget"),
        axios.get("http://3.120.98.12/map/get_graph/time"),
        axios.get("http://3.120.98.12/map/get_gist/page"),
        axios.get("http://3.120.98.12/map/get_gist/site"),
        axios.get("http://3.120.98.12/map/get_gist/OS"),
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
        // for graph browser
        let graphBr = [];
        for (let i = 0; i < response[3].data.data.length; i++) {
          graphBr.push({
            x: response[3].data.data[i].browser,
            y: response[3].data.data[i].value,
          });
        }
        // for graph gadgets
        let graphGg = [];
        for (let i = 0; i < response[4].data.data.length; i++) {
          graphGg.push({
            x: response[4].data.data[i].gadgetType,
            y: response[4].data.data[i].value,
          });
        }
        // for graph time
        let graphTime = [];
        for (let i = 0; i < response[5].data.data.length; i++) {
          graphTime.push({
            x: response[5].data.data[i].time + " мин",
            y: response[5].data.data[i].value,
          });
        }
        // for page graph
        let graphPage = [];
        for (let i = 0; i < response[6].data.data.length; i++) {
          graphPage.push({
            x: response[6].data.data[i].page,
            y: response[6].data.data[i].value,
          });
        }
        // for graph url
        let graphUrl = [];
        let counter = 0;
        for (let i = 0; i < response[7].data.data.length; i++) {
          if (response[7].data.data[i].site != "") {
            graphUrl.push({
              id: counter,
              x: response[7].data.data[i].site,
              y: response[7].data.data[i].value,
            });
            counter++
          }
        }
        // get graph os
        let graphOs = [];
        for (let i = 0; i < response[8].data.data.length; i++) {
          graphOs.push({
            x: response[8].data.data[i]["OS"],
            y: response[8].data.data[i].value,
          });
        }

        this.setState({
          browsers: browsersItems,
          gadgets: gadgetsItems,
          os: osItems,
          graphBr: graphBr,
          graphGg: graphGg,
          graphTime: graphTime,
          graphPage: graphPage,
          graphUrl: graphUrl,
          graphOs: graphOs,
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
      window = (
        <WindowGraphs
          graphBr={this.state.graphBr}
          graphGg={this.state.graphGg}
          graphTime={this.state.graphTime}
          graphPage={this.state.graphPage}
          graphUrl={this.state.graphUrl}
          graphOs={this.state.graphOs}
        />
      );
    }

    return (
      <section className="graphs">
        <div className="graphs-container">
          <div className="graphs-buttons">
            <button
              class="graphs-button__first graphs-button__first--anim"
              onClick={this.onHeatMap}
            >
              <span>Тепловая карта</span>
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
