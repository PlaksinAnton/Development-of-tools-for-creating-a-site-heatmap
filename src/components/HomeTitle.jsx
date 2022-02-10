import React from 'react';
import lamp from "../assets/imgs/lamp.svg";
import sofaHeader from "../assets/imgs/sofa-header.png";
import sale from "../assets/imgs/sale.svg";

const HomeTitle = (props) => {
  return (
    <section class="home-title">
      <img src={lamp} alt="" class="home-title__lamp" />
      <img src={sofaHeader} alt="" class="home-title__sofa" />
      <img src={sale} alt="" class="home-title__sale" />
      <div class="container home-title__container">
        <div class="home-title__pre-title">Best Furniture For Your Castle....</div>
        <h1 class="home-title__title">New Furniture Collection
          Trends in 2020</h1>
        <div class="home-title__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est
          adipiscing
          in phasellus non in justo.</div>
        <button class="home-title__button">Shop Now</button>
      </div>
    </section>

  )
}
export default HomeTitle;