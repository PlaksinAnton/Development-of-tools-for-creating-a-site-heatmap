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

const App = function (props) {
  const [dataForGraph, setDataForGraph] = useState("");
  const [dataForHeatmapHome, setDataForHeatmapHome] = useState("");
  const [dataForHeatmapProduct, setDataForHeatmapProduct] = useState("");
  const [dataForHeatmapGrid, setDataForHeatmapGrid] = useState("");
  const [dataForTime, setDataForTime] = useState("");
  const [dataForDevices, setDataForDevices] = useState("");
  const [dataForHomeСhromeBrowser, setDataForHomeChromeBrowser] = useState("");
  const [dataForGridСhromeBrowser, setDataForGridChromeBrowser] = useState("");
  const [dataForProductСhromeBrowser, setDataForProductChromeBrowser] =
    useState("");
  const [dataForHomeFirefoxBrowser, setDataForHomeFirefoxBrowser] =
    useState("");
  const [dataForGridFirefoxBrowser, setDataForGridFirefoxBrowser] =
    useState("");
  const [dataForProductFirefoxBrowser, setDataForProductFirefoxBrowser] =
    useState("");

  useEffect(async () => {
    !dataForGraph &&
      !dataForDevices &&
      !dataForTime &&
      axios
        .all([
          axios.get("http://127.0.0.1:5000/get_gist/browser"),
          axios.get("http://127.0.0.1:5000/get_gist/gadget"),
          axios.get("http://127.0.0.1:5000/get_graph/time"),
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
          })
        )
        .catch((error) => console.log(error));
  });

  const getDataHome = () => {
    !dataForHeatmapHome &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/home`)
        .then((response) => {
          let dataPoints = response.data.data;
          setDataForHeatmapHome(dataPoints);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const getDataGrid = () => {
    !dataForHeatmapGrid &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/grid`)
        .then((response) => {
          let dataPoints = response.data.data;
          setDataForHeatmapGrid(dataPoints);
        })
        .catch((error) => {
          console.log(error);
        });
  };
  const getDataProduct = () => {
    !dataForHeatmapProduct &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/product`)
        .then((response) => {
          let dataPoints = response.data.data;
          setDataForHeatmapProduct(dataPoints);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  function viewHeatMapHome() {
    getDataHome();
    let data = {
      max: 15,
      min: 0,
      data: dataForHeatmapHome,
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
    }
    heatmapInstance.setData(data);
  }

  function viewHeatMapGrid() {
    getDataGrid();
    let data = {
      max: 15,
      min: 0,
      data: dataForHeatmapGrid,
    };
    var myFrame = document.getElementById("heatmap-home");
    let name = myFrame.getAttribute("src");
    let heatmapInstance;
    if (name == "http://localhost:3000/grid") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".grid-page"),
      });
    }
    heatmapInstance.setData(data);
  }

  function viewHeatMaProduct() {
    getDataProduct();
    let data = {
      max: 15,
      min: 0,
      data: dataForHeatmapProduct,
    };
    let myFrame = document.getElementById("heatmap-home");
    let name = myFrame.getAttribute("src");
    let heatmapInstance;
    if (name == "http://localhost:3000/product") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".productPage"),
      });
    }
    heatmapInstance.setData(data);
  }

  const getHomeDataBrowser = () => {
    !dataForHomeСhromeBrowser &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/browser/home`)
        .then((response) => {
          let data = response.data.data;
          setDataForHomeChromeBrowser(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  function viewHomeChromeBrowser() {
    getHomeDataBrowser();
    let dataBrowser = [];
    for (let i = 0; i < dataForHomeСhromeBrowser.length; i++) {
      for (let key in dataForHomeСhromeBrowser[i]) {
        console.log(key);
        if (key.indexOf("Chrome") + 1) {
          dataBrowser = dataBrowser.concat(
            dataBrowser,
            dataForHomeСhromeBrowser[i][key]
          );
        }
      }
    }
    let data = {
      max: 15,
      min: 0,
      data: dataBrowser,
    };
    console.log(dataBrowser);
    let myFrame = document.getElementById("heatmap-home");
    let name = myFrame.getAttribute("src");
    let heatmapInstance;
    if (name == "http://localhost:3000/") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".HomePage"),
      });
      heatmapInstance.setData(data);
    }
  }

  const getGridDataBrowser = () => {
    !dataForGridСhromeBrowser &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/browser/grid`)
        .then((response) => {
          let data = response.data.data;
          setDataForGridChromeBrowser(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  function viewGridChromeBrowser() {
    getGridDataBrowser();
    let dataBrowser = [];
    for (let i = 0; i < dataForGridСhromeBrowser.length; i++) {
      for (let key in dataForGridСhromeBrowser[i]) {
        if (key.indexOf("Chrome") + 1) {
          dataBrowser = dataBrowser.concat(
            dataBrowser,
            dataForGridСhromeBrowser[i][key]
          );
        }
      }
    }
    let data = {
      max: 15,
      min: 0,
      data: dataBrowser,
    };
    console.log(dataBrowser);
    let myFrame = document.getElementById("heatmap-home");
    let name = myFrame.getAttribute("src");
    let heatmapInstance;
    if (name == "http://localhost:3000/grid") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".grid-page"),
      });
      heatmapInstance.setData(data);
    }
  }

  const getProductDataBrowser = () => {
    !dataForProductСhromeBrowser &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/browser/product`)
        .then((response) => {
          let data = response.data.data;
          setDataForProductChromeBrowser(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  function viewProductChromeBrowser() {
    getProductDataBrowser();
    let dataBrowser = [];
    for (let i = 0; i < dataForProductСhromeBrowser.length; i++) {
      for (let key in dataForProductСhromeBrowser[i]) {
        if (key.indexOf("Chrome") + 1) {
          dataBrowser = dataBrowser.concat(
            dataBrowser,
            dataForProductСhromeBrowser[i][key]
          );
        }
      }
    }
    let data = {
      max: 15,
      min: 0,
      data: dataBrowser,
    };
    let myFrame = document.getElementById("heatmap-home");
    let name = myFrame.getAttribute("src");
    let heatmapInstance;
    if (name == "http://localhost:3000/product") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".productPage"),
      });
      heatmapInstance.setData(data);
    }
  }

  const getHomeFirefoxDataBrowser = () => {
    !dataForHomeFirefoxBrowser &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/browser/home`)
        .then((response) => {
          let data = response.data.data;
          setDataForHomeFirefoxBrowser(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  function viewHomeFirefoxBrowser() {
    getHomeFirefoxDataBrowser();
    let dataBrowser = [];
    for (let i = 0; i < dataForHomeFirefoxBrowser.length; i++) {
      for (let key in dataForHomeFirefoxBrowser[i]) {
        if (key.indexOf("Firefox") + 1) {
          dataBrowser = dataBrowser.concat(
            dataBrowser,
            dataForHomeFirefoxBrowser[i][key]
          );
        }
      }
    }
    let data = {
      max: 15,
      min: 0,
      data: dataBrowser,
    };
    console.log(dataForHomeFirefoxBrowser);
    let myFrame = document.getElementById("heatmap-home");
    let name = myFrame.getAttribute("src");
    let heatmapInstance;
    if (name == "http://localhost:3000/") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".HomePage"),
      });
      heatmapInstance.setData(data);
    }
  }

  const getGridFirefoxDataBrowser = () => {
    !dataForGridFirefoxBrowser &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/browser/home`)
        .then((response) => {
          let data = response.data.data;
          setDataForGridFirefoxBrowser(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  function viewGridFirefoxBrowser() {
    getGridFirefoxDataBrowser();
    let dataBrowser = [];
    for (let i = 0; i < dataForGridFirefoxBrowser.length; i++) {
      for (let key in dataForGridFirefoxBrowser[i]) {
        if (key.indexOf("Firefox") + 1) {
          dataBrowser = dataBrowser.concat(
            dataBrowser,
            dataForGridFirefoxBrowser[i][key]
          );
        }
      }
    }
    let data = {
      max: 15,
      min: 0,
      data: dataBrowser,
    };
    console.log(dataForGridFirefoxBrowser);
    let myFrame = document.getElementById("heatmap-home");
    let name = myFrame.getAttribute("src");
    let heatmapInstance;
    if (name == "http://localhost:3000/grid") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".grid-page"),
      });
      heatmapInstance.setData(data);
    }
  }

  const getProductFirefoxDataBrowser = () => {
    !dataForProductFirefoxBrowser &&
      axios
        .get(`http://127.0.0.1:5000/get_heatmap/browser/home`)
        .then((response) => {
          let data = response.data.data;
          setDataForProductFirefoxBrowser(data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  function viewProductFirefoxBrowser() {
    getProductFirefoxDataBrowser();
    let dataBrowser = [];
    for (let i = 0; i < dataForProductFirefoxBrowser.length; i++) {
      for (let key in dataForProductFirefoxBrowser[i]) {
        if (key.indexOf("Firefox") + 1) {
          dataBrowser = dataBrowser.concat(
            dataBrowser,
            dataForProductFirefoxBrowser[i][key]
          );
        }
      }
    }
    let data = {
      max: 15,
      min: 0,
      data: dataBrowser,
    };
    console.log(dataForProductFirefoxBrowser);
    let myFrame = document.getElementById("heatmap-home");
    let name = myFrame.getAttribute("src");
    let heatmapInstance;
    if (name == "http://localhost:3000/product") {
      heatmapInstance = h337.create({
        container: document
          .querySelector(".heatmap-home")
          .contentDocument.querySelector(".productPage"),
      });
      heatmapInstance.setData(data);
    }
  }

  function viewGridPage() {
    let myFrame = document.getElementById("heatmap-home");
    myFrame.setAttribute("src", "http://localhost:3000/grid");
  }
  function viewHomePage() {
    let myFrame = document.getElementById("heatmap-home");
    myFrame.setAttribute("src", "http://localhost:3000/");
  }
  function viewProductPage() {
    let myFrame = document.getElementById("heatmap-home");
    myFrame.setAttribute("src", "http://localhost:3000/product");
  }

  return (
    <section class="graphs">
      <div class="graphs-container">
        <div class="victorypie">
          <div class="graph-description">
            <p>Зависимость количества кликов от типа браузера</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <VictoryChart
              domainPadding={{ x: 50 }}
              theme={VictoryTheme.material}
              padding={{ left: 120, bottom: 50, right: 10 }}
            >
              <VictoryBar
                horizontal
                barWidth={20}
                style={{
                  data: { fill: "#DCE775", width: 15 },
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
          </div>
          <div className="graph-description">
            <p>Зависимость количества кликов от типа устройства</p>
          </div>
          <div>
            <VictoryChart
              domainPadding={{ x: 50 }}
              theme={VictoryTheme.material}
              padding={{ left: 120, bottom: 50, right: 10 }}
            >
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
          </div>
          <div className="graph-description">
            <p>
              Зависимость количества кликов от времени, проведённом на сайте
            </p>
          </div>
          <div>
            <VictoryChart
              domainPadding={{ x: 50 }}
              theme={VictoryTheme.material}
              padding={{ left: 120, bottom: 50, right: 10 }}
            >
              <VictoryBar
                barWidth={20}
                style={{
                  data: { fill: "blue" },
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
        </div>
        <div class="heatmap-display">
          <div class="heatmap-description">
            <h2>Функционал для отображения тепловой карты</h2>
          </div>
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
              <button class="graphs-button" onClick={viewHeatMapHome}>
                Heatmap for HomePage
              </button>
              <button class="graphs-button" onClick={viewHeatMapGrid}>
                Heatmap for GridPage
              </button>
              <button class="graphs-button" onClick={viewHeatMaProduct}>
                Heatmap for ProductPage
              </button>
            </div>
            <div className="browser-buttons">
              <button
                className="graphs-button"
                onClick={viewHomeFirefoxBrowser}
              >
                Firefox Heatmap for HomePage
              </button>
              <button
                className="graphs-button"
                onClick={viewGridFirefoxBrowser}
              >
                Firefox Heatmap for GridPage
              </button>
              <button
                className="graphs-button"
                onClick={viewProductFirefoxBrowser}
              >
                Firefox Heatmap for ProductPage
              </button>
            </div>
            <div className="filter-buttons">
              <button class="graphs-button" onClick={viewHomeChromeBrowser}>
                Google Chrome Heatmap for HomePage
              </button>
              <button className="graphs-button" onClick={viewGridChromeBrowser}>
                Google Chrome Heatmap for GridPage
              </button>
              <button
                className="graphs-button"
                onClick={viewProductChromeBrowser}
              >
                Google Chrome Heatmap for ProductPage
              </button>
            </div>
          </div>
          <div class="heatmap-pic">
            <div className="heatmap-iframe">
              <iframe
                class="heatmap-home"
                id="heatmap-home"
                src="http://localhost:3000/"
                height="1000px"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default App;
