import React, { useEffect, useState } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
} from "victory";
import axios from "axios";
import h337 from "heatmap.js";

// window.onload = () => {
// let homeIframe = document.getElementById('heatmap-home');
// console.log(homeIframe)
// if (homeIframe != null) {
//   let homeContent = homeIframe.contentDocument;
//   homeContent.body.innerHTML = homeContent.body.innerHTML + '<style>.footer-heatmapButton{visibility: visible}</style>';
// }
// let gridIframe = document.getElementById('heatmap-grid');
// let productIframe = document.getElementById('heatmap-product');

// let homeContent = homeIframe.contentDocument;
// console.log(homeContent)
// let gridContent = gridIframe.contentDocument;
// let productContent = productIframe.contentDocument;

// homeContent.body.innerHTML = homeContent.body.innerHTML + '<style>.footer-heatmapButton{visibility: visible}</style>';
// gridContent.body.innerHTML = gridContent.body.innerHTML + '<style>.footer-heatmapButton{visibility: visible}</style>';
// productContent.body.innerHTML = productContent.body.innerHTML + '<style>.footer-heatmapButton{visibility: visible}</style>';
// }

const App = function (props) {
  const [dataForGraph, setDataForGraph] = useState("");
  const [dataForHeatmap, setDataForHeatmap] = useState("");
  function viewHeatMap() {
    getData();
    var data = {
      max: 15,
      min: 0,
      data: dataForHeatmap,
    };
    var myFrame = document.getElementById("heatmap-home");
    let name = myFrame.getAttribute("src");
    let heatmapInstance;
    if (name == "http://localhost:3000/") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".HomePage"),
      });
    } else if (name == "http://localhost:3000/grid") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".grid-page"),
      });
    } else if (name == "http://localhost:3000/product") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".productPage"),
      });
    }
    heatmapInstance.setData(data);
  }

  function viewGridPage() {
    var myFrame = document.getElementById("heatmap-home");
    myFrame.setAttribute("src", "http://localhost:3000/grid");
  }
  function viewHomePage() {
    var myFrame = document.getElementById("heatmap-home");
    myFrame.setAttribute("src", "http://localhost:3000/");
  }
  function viewProductPage() {
    var myFrame = document.getElementById("heatmap-home");
    myFrame.setAttribute("src", "http://localhost:3000/product");
  }

  const getData = () => {
    !dataForHeatmap &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap`)
        .then((response) => {
          let dataPoints = response.data.data;
          setDataForHeatmap(dataPoints);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const [dateForDevices, setDataForDevices] = useState("");
  const [dataArr, setDataArr] = useState("");

  useEffect(async () => {
    !dataForGraph &&
      axios("http://127.0.0.1:5000/get_gist/browser ")
        .then((response) => {
          let data = [];
          for (let i = 0; i < response.data.data.length; i++) {
            data.push({
              x: i + 1,
              y: response.data.data[i].value,
              label: response.data.data[i].browser,
            });
          }
          setDataForGraph(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  useEffect(async () => {
    !dateForDevices &&
      axios("http://127.0.0.1:5000/get_gist/gadget ")
        .then((response) => {
          let data = [];
          for (let i = 0; i < response.data.data.length; i++) {
            data.push({
              x: i + 1,
              y: response.data.data[i].value,
              label: response.data.data[i].browser,
            });
          }
          setDataForDevices(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  useEffect(async () => {
    !dataForHeatmap &&
      axios("http://127.0.0.1:5000/get_heatmap ")
        .then((response) => {
          let dataPoints = response.data.data;
          console.log(dataPoints);
          setDataForHeatmap(dataPoints);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  return (
    <section class="graphs">
      <div class="graphs-container">
        {/*<div className="button-container">*/}
        {/*  <button className="data-button">*/}
        {/*    Получить данные из базы данных!*/}
        {/*  </button>*/}
        {/*</div>*/}
        <div class="victorypie">
          <VictoryBar
            data={dataForGraph}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          return props.text === "clicked"
                            ? null
                            : { text: "clicked" };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
          {/* <VictoryPie colorScale={["tomato", "orange", "gold"]} />
          <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              data={Object.values(dataForGraph)}
            />
          </VictoryChart>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" },
              }}
              data={Object.values(dataForGraph)}
            />
          </VictoryChart> */}
          <VictoryChart
            horizontal
            domainPadding={{ x: 8 }}
            // style={{
            //   width: "100px",
            // }}
          >
            <VictoryBar
              style={{
                data: { fill: "#DCE775" },
                width: "40px",
              }}
              // data={
              //   [
              //     { x: 1, y: 2, label: "A" },
              //     { x: 2, y: 4, label: "B" },
              //     { x: 3, y: 7, label: "C" },
              //     { x: 4, y: 3, label: "D" },
              //     { x: 5, y: 5, label: "E" },
              //   ]
              // }
              data={dataForGraph}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          target: "labels",
                          mutation: (props) => {
                            return props.text === "clicked"
                              ? null
                              : { text: "clicked" };
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
            <VictoryScatter data={dataForGraph} />
          </VictoryChart>
          <div class="graph-description">
            <p>Зависимость количества кликов от типа браузера</p>
          </div>
          <VictoryChart horizontal domainPadding={{ x: 8 }}>
            <VictoryBar
              style={{
                data: { fill: "gold" },
                width: "20px",
              }}
              // data={
              //   [
              //     { x: 1, y: 2, label: "A" },
              //     { x: 2, y: 4, label: "B" },
              //     { x: 3, y: 7, label: "C" },
              //     { x: 4, y: 3, label: "D" },
              //     { x: 5, y: 5, label: "E" },
              //   ]
              // }
              data={dateForDevices}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: () => {
                      return [
                        {
                          target: "labels",
                          mutation: (props) => {
                            return props.text === "clicked"
                              ? null
                              : { text: "clicked" };
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
            <VictoryScatter data={dateForDevices} />
          </VictoryChart>
          <div className="graph-description">
            <p>Зависимость количества кликов от устройства</p>
          </div>
        </div>
        <div class="heatmap-display">
          <div class="graphs-buttons">
            <button class="graphs-button" onClick={viewHeatMap}>
              Включить Heatmap
            </button>
            <button class="graphs-button" onClick={viewHomePage}>
              Home Page
            </button>
            <button class="graphs-button" onClick={viewGridPage}>
              Grid Page
            </button>
            <button class="graphs-button" onClick={viewProductPage}>
              Product Page
            </button>
          </div>
          <div class="heatmap-pic">
            <iframe
              class="heatmap-home"
              id="heatmap-home"
              src="http://localhost:3000/"
              height="1000px"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
export default App;
