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
  return (
    <section className="heatmap-container">
      <AdminHeader />
      <GraphContainer />
    </section>
  );
}
export { GraphicPage };
