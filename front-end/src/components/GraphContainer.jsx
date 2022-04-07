import React, { useEffect, useState } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLine,
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
    getData()
    var data = {
      max: 15,
      min: 0,
      data: dataForHeatmap,
    };
    var myFrame = document.getElementById('heatmap-home');
    let name = myFrame.getAttribute('src');
    let heatmapInstance;
    if (name == "http://localhost:3000/") {
      heatmapInstance = h337.create({
        container: document.querySelector(".heatmap-home").contentDocument.querySelector(".HomePage"),
      })
    }
    else if (name == "http://localhost:3000/grid") {
      heatmapInstance = h337.create({
        container: document.querySelector(".heatmap-home").contentDocument.querySelector(".grid-page"),
      })
    }
    else if (name == "http://localhost:3000/product") {
      heatmapInstance = h337.create({
        container: document.querySelector(".heatmap-home").contentDocument.querySelector(".productPage"),
      })
    }
    heatmapInstance.setData(data);
  };

  function viewGridPage() {
    var myFrame = document.getElementById('heatmap-home');
    myFrame.setAttribute('src', 'http://localhost:3000/grid');
  }
  function viewHomePage() {
    var myFrame = document.getElementById('heatmap-home');
    myFrame.setAttribute('src', 'http://localhost:3000/');
  }
  function viewProductPage() {
    var myFrame = document.getElementById('heatmap-home');
    myFrame.setAttribute('src', 'http://localhost:3000/product');
  }

  const getData = () => {
    !dataForHeatmap &&
      axios.get(`http://127.0.0.1:5000/get_heatmap`).then((response) => {
        let dataPoints = response.data.data
        setDataForHeatmap(dataPoints);
      }).catch((error) => {
        console.log(error);
      });
  }

  useEffect(async () => {
    !dataForGraph &&
      axios("http://127.0.0.1:5000/get_gist/browser ")
        .then((response) => {
          let data = []
          for (let i = 0; i < response.data.data.length; i++) {
            data.push({ x: i + 1, y: response.data.data[i].value, label: response.data.data[i].browser })
          }
          setDataForGraph(data);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  useEffect(async () => {
    !dataForHeatmap &&
      axios("http://127.0.0.1:5000/get_heatmap ")
        .then((response) => {
          let dataPoints = response.data.data
          console.log(dataPoints)
          setDataForHeatmap(dataPoints);
        })
        .catch((error) => {
          console.log(error);
        });
  })
  return (
    <section class="graphs">
      <div class="graphs-container">
        <div className="button-container">
          <button className="data-button">
            Получить данные из базы данных!
          </button>
        </div>
        <div class="victorypie">
          <VictoryBar
            data={dataForGraph}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [{
                      target: "labels",
                      mutation: (props) => {
                        return props.text === "clicked" ?
                          null : { text: "clicked" }
                      }
                    }];
                  }
                }
              }
            ]}
          />
        </div>
      </div>
      <div class="heatmap-display">
        <div class="graphs-buttons">
          <button class="graphs-button" onClick={viewHeatMap}>Включить Heatmap</button>
          <button class="graphs-button" onClick={viewHomePage}>Home Page</button>
          <button class="graphs-button" onClick={viewGridPage}>Grid Page</button>
          <button class="graphs-button" onClick={viewProductPage}>Product Page</button>
        </div>
        <iframe class="heatmap-home" id="heatmap-home" height="1000px" src="http://localhost:3000/"></iframe>
      </div>
    </section >
  );
};
export default App;
