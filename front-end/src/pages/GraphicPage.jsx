import React, { useState, useEffect } from "react";
import GraphContainer from "../components/GraphContainer.jsx";
// import h337 from "heatmap.js";
import detect from "detect.js";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getPosition } from "../Clicks";
import AdminHeader from "../components/adminHeader.jsx";
import AdminFooter from "../components/adminFooter";

function GraphicPage() {
  useEffect(() => {
    document.querySelector(".graphs").addEventListener("click", (ev) => {
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
        page: "admin"
      };
      console.log(user);
      sendData(user);
    });

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
      <AdminHeader />
      <GraphContainer />
      <AdminFooter />
    </>
  );
}
export { GraphicPage };
