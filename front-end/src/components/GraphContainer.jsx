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


const App = function (props) {
  const [dataForGraph, setDataForGraph] = useState("");
  const [dataForHeatmap, setDataForHeatmap] = useState("");
  const [dataForTime, setDataForTime] = useState("");
  const [dataForDevices, setDataForDevices] = useState("");
  const [dataForBrowser, setDataForBrowser] = useState("");

  useEffect(async () => {
    !dataForGraph && !dataForDevices && !dataForTime &&
      axios.all(
        [
          axios.get("http://127.0.0.1:5000/get_gist/browser"),
          axios.get("http://127.0.0.1:5000/get_gist/gadget"),
          axios.get("http://127.0.0.1:5000/get_graph/time")
        ])
        .then(
          axios.spread((firstResponse, secondResponse, thirdResponse) => {
            let firstData = [];
            for (let i = 0; i < firstResponse.data.data.length; i++) {
              firstData.push({
                x: firstResponse.data.data[i].browser,
                y: firstResponse.data.data[i].value,
                // label: firstResponse.data.data[i].browser,
              });
            }
            setDataForGraph(firstData);
            let secondData = [];
            for (let i = 0; i < secondResponse.data.data.length; i++) {
              secondData.push({
                x: secondResponse.data.data[i].gadgetType,
                y: secondResponse.data.data[i].value,
                // label: secondResponse.data.data[i].gadgetType,
              });
            }
            setDataForDevices(secondData);
            let thirdData = [];
            for (let i = 0; i < thirdResponse.data.data.length; i++) {
              thirdData.push({
                x: thirdResponse.data.data[i].time + " мин",
                y: thirdResponse.data.data[i].value,
                // label: thirdResponse.data.data[i].time + "мин",
              });
            }
            setDataForTime(thirdData);
          }))
        .catch(error => console.log(error));
  });

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

  const getDataBrowser = () => {
    !dataForBrowser &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/browser`)
        .then((response) => {
          let data = response.data.data;
          setDataForBrowser(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  function viewHeatMap() {
    getData();
    let data = {
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

  function viewBrowser() {
    getDataBrowser();
    let dataBrowser = [];
    for (let i = 0; i < dataForBrowser.length; i++) {
      for (let key in dataForBrowser[i]) {
        if (key.indexOf("Chrome") + 1) {
          dataBrowser = dataBrowser.concat(dataBrowser, dataForBrowser[i][key])
        }
      }
    }
    let data = {
      max: 15,
      min: 0,
      data: dataBrowser,
    };
    console.log(dataBrowser)
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

  return (
    <section class="graphs">
      <div class="graphs-container">
        {/*<div className="button-container">*/}
        {/*  <button className="data-button">*/}
        {/*    Получить данные из базы данных!*/}
        {/*  </button>*/}
        {/*</div>*/}
        <div class="victorypie">
          <div class="graph-description">
            <p>Зависимость количества кликов от типа браузера</p>
          </div>
          <VictoryChart domainPadding={{ x: 50 }} theme={VictoryTheme.material}>
            <VictoryBar
              barWidth={20}
              style={{
                data: { fill: "#DCE775" },
              }}
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
          <div className="graph-description">
            <p>Зависимость количества кликов от типа устройства</p>
          </div>
          <VictoryChart domainPadding={{ x: 50 }} theme={VictoryTheme.material}>
            <VictoryBar
              barWidth={20}
              style={{
                data: { fill: "gold" },
              }}
              data={dataForDevices}
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
            <VictoryScatter data={dataForDevices} />
          </VictoryChart>
          <div className="graph-description">
            <p>
              Зависимость количества кликов от времени, проведённом на сайте
            </p>
          </div>
          <VictoryChart domainPadding={{ x: 50 }} theme={VictoryTheme.material}>
            <VictoryBar
              barWidth={20}
              style={{
                data: { fill: "gold" },
              }}
              data={dataForTime}
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
            <VictoryScatter data={dataForTime} />
          </VictoryChart>
        </div>
        <div class="heatmap-display">
          <div class="graphs-buttons">
            <div class="pages-buttons">
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
            <div className="classic-buttons">
              <button class="graphs-button" onClick={viewHeatMap}>
                Heatmap
              </button>
            </div>
            <div className="browser-buttons">
              <button class="graphs-button" onClick={viewBrowser}>
                Google Chrome
              </button>
            </div>
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
