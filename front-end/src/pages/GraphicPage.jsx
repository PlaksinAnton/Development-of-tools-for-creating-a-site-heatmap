import React, { useState, useEffect } from "react";
import GraphContainer from "../components/GraphContainer.jsx";
import AdminHeader from "../components/adminHeader.jsx";

function GraphicPage() {
  return (
    <section className="heatmap-container">
      <AdminHeader />
      <GraphContainer />
    </section>
  );
}
export { GraphicPage };
