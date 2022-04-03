import React, { useEffect } from "react";
import GridDefault from "../components/GridDefault.jsx";
import MainItems from "../components/MainItems.jsx";
import h337 from "heatmap.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Grid = (props) => {
  // useEffect(() => {
  //   let heatmapInstance = h337.create({
  //     container: document.querySelector(".grid-page"),
  //   });
  //   document.querySelector(".grid-page").addEventListener("click", (ev) => {
  //     heatmapInstance.addData({
  //       x: ev.layerX,
  //       y: ev.layerY,
  //       value: 1,
  //     });
  //     console.log(heatmapInstance.getData());
  //   });
  // });
  return (
    <section class="grid-page">
      <Header />
      <GridDefault name="Shop Grid Default" />
      <MainItems />
      <Footer />
    </section>
  );
};
export { Grid };
