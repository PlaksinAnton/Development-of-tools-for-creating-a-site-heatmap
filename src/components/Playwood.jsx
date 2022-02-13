import React from 'react';
import productFirst from "../assets/imgs/product-first.png"
import productSecond from "../assets/imgs/product-second.png"
import productFourth from "../assets/imgs/product-fourth.png"
import productThird from "../assets/imgs/product-third.png"
import star from "../assets/imgs/star.png"
import heart2 from "../assets/imgs/heart-2.svg"
import facebookPic from "../assets/imgs/facebook-pic.svg"
import pinkInst from "../assets/imgs/pink-inst.svg"
import twitterPic from "../assets/imgs/twitter-pic.svg"

const Playwood = (props) => {
  return (
    <section class="playwood">
      <div class="container">
        <div class="playwood-container">
          <div class="playwood-left">
            <div class="playwood-left__left">
              <img
                src={productFirst}
                alt="First picture"
                class="playwood-left__pic"
              /><img
                src={productSecond}
                alt="Second picture"
                class="playwood-left__pic"
              />
              <img
                src={productFourth}
                alt="Third picture"
                class="playwood-left__pic"
              />
            </div>
            <div class="playwood-left__right">
              <img
                src={productThird}
                alt="Third picture"
                class="playwood-left__picture"
              />
            </div>
          </div>
          <div class="playwood-right">
            <span class="chair">Playwood arm chair</span>
            <div class="stars-num">
              <div class="stars">
                <img src={star} alt="Star" class="star" />
                <img
                  src={star}
                  alt="Star"
                  class="star"
                /><img src={star} alt="Star" class="star" />
                <img
                  src={star}
                  alt="Star"
                  class="star"
                />
                <img src={star} alt="Stars" class="star" />
              </div>
              <span class="num">(22)</span>
            </div>
            <div class="cost">
              <span class="cost__left">$32.00</span>
              <span class="cost__right">$32.00</span>
            </div>
            <span class="color">Color</span>
            <span class="about"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              tellus porttitor purus, et volutpat sit.</span
            >
            <div class="add">
              <span class="add-cart">Add To cart</span>
              <img src={heart2} alt="Heart " class="add-heart" />
            </div>
            <span class="categories">Categories:</span>
            <span class="tags">Tags</span>
            <div class="share">
              <span class="share__left">Share</span>
              <div class="share__right">
                <img
                  src={facebookPic}
                  alt="Icon: facebook"
                  class="facebook-icon"
                />
                <img
                  src={pinkInst}
                  alt="Icon: instagram"
                  class="instagram-icon"
                />
                <img
                  src={twitterPic}
                  alt="Icon: twitter"
                  class="twitter-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Playwood;