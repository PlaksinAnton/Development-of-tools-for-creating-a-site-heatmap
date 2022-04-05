import React, { useState, useEffect } from "react";
import GraphContainer from "../components/GraphContainer.jsx";
// import h337 from "heatmap.js";
import detect from "detect.js";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getPosition } from "../components/Clicks";
import AdminHeader from "../components/adminHeader.jsx";

function GraphicPage() {
  useEffect(() => {
    //   let dataPoint1 = {
    //     x: 50,
    //     y: 50,
    //     value: 100
    //   };
    //   let dataPoint2 = {
    //     x: 10,
    //     y: 10,
    //     value: 10
    //   };
    //   let dataPoint3 = {
    //     x: 400,
    //     y: 400,
    //     value: 20
    //   };
    //   let dataPoint4 = {
    //     x: 1000,
    //     y: 1000,
    //     value: 100
    //   };
    //   let dataPoints = [dataPoint1, dataPoint2, dataPoint3, dataPoint4];
    //   var data = {
    //     max: 100,
    //     min: 0,
    //     data: dataPoints,
    //   };
    //   let heatmapInstance = h337.create({
    //     // only container is required, the rest will be defaults
    //     container: document.querySelector(".graphs"),
    //   });
    document.querySelector(".graphs").addEventListener("click", (ev) => {
      // heatmapInstance.addData({
      //   x: ev.layerX,
      //   y: ev.layerY,
      //   value: 1,
      // });
      // let heatmapClicks = {
      //   clicks: heatmapInstance.getData(),
      // };
      // get information about users
      const date = new Date();
      if (!sessionStorage.getItem("startTime")) {
        sessionStorage.setItem("startTime", Date.now());
      }
      let computerInfo = detect.parse(navigator.userAgent);
      const enterTime = sessionStorage.getItem("startTime");
      let currentTime = Date.now();
      let spentTime = (currentTime - enterTime) / 1000;
      let coordinats = getPosition(ev);
      let user = {
        date: date.toLocaleString(),
        browser: computerInfo.browser.name,
        gadget: computerInfo.device.name,
        gadgetType: computerInfo.device.type,
        os: computerInfo.os.name,
        // computerInfo: navigator.userAgent,
        minutes: Math.floor(spentTime / 60),
        seconds: Math.floor(spentTime % 60),
        coordinats: getPosition(ev),
      };
      console.log(user);
      sendData(user);
    });

    const getData = () => {
      return fetch("http://127.0.0.1:5000/get_data ")
        .then((result) => result.json())
        .catch((error) => console.log(error));
    };

    const sendData = (data) => {
      return fetch(" http://127.0.0.1:5000/send_data2", {
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
      <AdminHeader />
      <GraphContainer />
      <Footer />
    </>
  );
}
export { GraphicPage };
