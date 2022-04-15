import React, { useEffect } from "react";
import GridDefault from "../components/GridDefault.jsx";
import MainItems from "../components/MainItems.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";

import detect from "detect.js";
import axios from "axios";
import { getPosition } from "../Clicks";

function Grid() {
  React.useEffect(() => {
    let url = document.referrer
    let urlJSON = {
      URL: url
    }
    console.log(urlJSON);
    const sendUrl = (data) => {
      return fetch("http://3.120.98.12/map/send_site", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
    };
    sendUrl(urlJSON)
    if (!sessionStorage.getItem("startTime")) {
      sessionStorage.setItem("startTime", Date.now());
    }
    let computerInfo = detect.parse(navigator.userAgent);
    const enterTime = sessionStorage.getItem("startTime");
    document.querySelector(".grid").addEventListener("click", (ev) => {
      const date = new Date();
      let currentTime = Date.now();
      let spentTime = (currentTime - enterTime) / 1000;
      let br = new String(computerInfo.browser.name)
      let browser = br.split(" ")[0]
      let o = new String(computerInfo.os.name)
      let os = o.split(" ")[0]
      let user = {
        date: date.toLocaleString(),
        browser: browser,
        gadget: computerInfo.device.name,
        gadgetType: computerInfo.device.type,
        os: os,
        minutes: Math.floor(spentTime / 60),
        seconds: Math.floor(spentTime % 60),
        coordinats: getPosition(ev),
        page: "grid",
      };
      console.log(user);
      sendData(user);
    });
    const sendData = (data) => {
      return fetch(" http://3.120.98.12/map/send_data", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
    };
  })
  return (
    <section class="grid">
      <Header />
      <GridDefault name="Shop Grid Default" />
      <MainItems />
      <Footer page="grid-page" />
    </section>
  );
};
export { Grid };
