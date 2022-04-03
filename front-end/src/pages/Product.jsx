import React from "react";
import Description from "../components/Description";
import GridDefault from "../components/GridDefault";
import Playwood from "../components/Playwood";
import Related from "../components/Related";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Product = (props) => {
  return (
    <>
      <Header />
      <GridDefault name="Product Details" />
      <Playwood />
      <Description />
      <Related />
      <Footer />
    </>
  );
};
export { Product };
