import React from "react";
import facebookPic from "../assets/imgs/facebook-pic.svg";
import instPic from "../assets/imgs/inst-pic.svg";
import twitterPic from "../assets/imgs/twitter-pic.svg";
import h337 from "heatmap.js";
import axios from "axios";

const Footer = (props) => {
  // function viewHeatMap() {
  //   getData();
  //   // console.log(dataPoints)
  // };
  // const getData = () => {
  //   axios.get(`http://127.0.0.1:5000/get_heatmap`).then((response) => {
  //     let dataPoints = response.data.data
  //     var data = {
  //       max: 15,
  //       min: 0,
  //       data: dataPoints,
  //     };
  //     let name = "." + props.page
  //     let heatmapInstance = h337.create({
  //       container: document.querySelector(name),
  //     })
  //     heatmapInstance.setData(data);
  //   })
  // }
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer__left">
          <span className="hekto">Hekto</span>
          <form action="#" className="footer-form">
            <input
              type="text"
              placeholder="Enter Email Address"
              className="footer-input"
            />
            <input type="button" value="Sign Up" className="footer-button" />
          </form>
          <span className="footer-contact">Contact Info</span>
          <span className="footer-adress">17 Princess Road, London, Greater London NW1 8JR, UK</span>
          {/* <button
            className="footer-button footer-heatmapButton"
            onClick={viewHeatMap}
          >
            View heat map
          </button> */}
        </div>
        <div className="footer__right">
          <ul className="footer-item">
            <li className="footer-item__main">Catagories</li>
            <li className="footer-item__li">Laptops & Computers</li>
            <li className="footer-item__li">Cameras & Photography</li>
            <li className="footer-item__li">Smart Phones & Tablets</li>
            <li className="footer-item__li">Video Games & Consoles</li>
            <li className="footer-item__li">Waterproof Headphones</li>
          </ul>
          <ul className="footer-item">
            <li className="footer-item__main">Customer Care</li>
            <li className="footer-item__li">My Account</li>
            <li className="footer-item__li">Discount</li>
            <li className="footer-item__li">Returns</li>
            <li className="footer-item__li">Orders History</li>
            <li className="footer-item__li">Order Tracking</li>
          </ul>
          <ul className="footer-item">
            <li className="footer-item__main">Pages</li>
            <li className="footer-item__li">Blog</li>
            <li className="footer-item__li">Browse the Shop</li>
            <li className="footer-item__li">Category</li>
            <li className="footer-item__li">Pre-Built Pages</li>
            <li className="footer-item__li">Visual Composer Elements</li>
            <li className="footer-item__li">WooCommerce Pages</li>
          </ul>
        </div>
      </div>

      <div className="footer-reserved">
        <div className="footer-reserved__container">
          <span className="reserved">©Webecy - All Rights Reserved</span>
          <div className="footer-icons">
            <a href="#" className="footer-icons__links">
              <img
                src={facebookPic}
                alt="Icon facebook"
                className="facebook-pic"
              />
            </a>
            <a href="#" className="footer-icons__links">
              <img src={instPic} alt="Icon instagram" className="inst-pic" />
            </a>
            <a href="#" className="footer-icons__links">
              <img src={twitterPic} alt="Icon twitter" className="twit-pic" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
