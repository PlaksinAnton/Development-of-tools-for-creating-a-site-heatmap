import React, { useState, useEffect } from "react";
import GraphContainer from "../components/GraphContainer.jsx";
import h337 from "heatmap.js";
import axios from "axios";

function GraphicPage() {
  useEffect(() => {
    let heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector(".graphs"),
    });

    document.querySelector(".graphs").addEventListener("click", (ev) => {
      heatmapInstance.addData({
        x: ev.layerX,
        y: ev.layerY,
        value: 1,
      });
      let heatmapClicks = {
        clicks: heatmapInstance.getData(),
      };
      sendData(heatmapClicks);
    });

    const getData = () => {
      return fetch("http://127.0.0.1:5000/get_data ")
        .then((result) => result.json())
        .catch((error) => console.log(error));
    };

    const sendData = (data) => {
      return fetch(" http://127.0.0.1:5000/send_data", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
    };
  });
  return (
    <>
      <GraphContainer />
    </>
  );
}
export { GraphicPage };
