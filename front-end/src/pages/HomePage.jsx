import React from "react";
import HomeTitle from "../components/HomeTitle.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import LeatestProducts from "../components/LeatestProducts.jsx";
import Offer from "../components/Offer.jsx";
import UniqueFeatures from "../components/UniqueFeatures.jsx";
import TrendingProducts from "../components/TrendingProducts.jsx";
import DiscountItem from "../components/DiscountItem.jsx";
import Top from "../components/Top.jsx";
import Subscribe from "../components/Subscribe.jsx";
import Brends from "../components/Brends.jsx";
import LeatestBlog from "../components/LeatestBlog.jsx";
import Footer from "../components/Footer";
import Header from "../components/Header";

import detect from "detect.js";
import axios from "axios";
import { getPosition } from "../Clicks";

function HomePage() {
  React.useEffect(() => {
    if (!sessionStorage.getItem("startTime")) {
      sessionStorage.setItem("startTime", Date.now());
    }
    let computerInfo = detect.parse(navigator.userAgent);
    const enterTime = sessionStorage.getItem("startTime");
    document.querySelector(".HomePage").addEventListener("click", (ev) => {
      const date = new Date();
      let currentTime = Date.now();
      let spentTime = (currentTime - enterTime) / 1000;
      let user = {
        date: date.toLocaleString(),
        browser: computerInfo.browser.name,
        gadget: computerInfo.device.name,
        gadgetType: computerInfo.device.type,
        os: computerInfo.os.name,
        minutes: Math.floor(spentTime / 60),
        seconds: Math.floor(spentTime % 60),
        coordinats: getPosition(ev),
        page: "home",
      };
      sendData(user);
      console.log(user);
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
    <section class="HomePage" id="HomePage">
      <Header />
      <HomeTitle />
      <FeaturedProducts />
      <LeatestProducts />
      <Offer />
      <UniqueFeatures />
      <TrendingProducts />
      <DiscountItem />
      <Top />
      <Subscribe />
      <Brends />
      <LeatestBlog />
      <Footer page={"HomePage"} />
    </section>
  );
}
export { HomePage };
