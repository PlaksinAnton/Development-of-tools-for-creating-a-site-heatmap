import React from 'react';
import freeDelivery from "../assets/imgs/free-delivery.svg";
import cashback from "../assets/imgs/cashback.svg";
import premiumQuality from "../assets/imgs/premium-quality.svg";
import hoursSupport from "../assets/imgs/24-hours-support.svg";


const Offer = (props) => {
  return (
    <section class="offer">
      <div class="container offer__container">
        <h3 class="title offer__title">What Shopex Offer!</h3>
        <div class="offer__cards">
          <div class="offer__card">
            <div class="offer__card-image">
              <img src={freeDelivery} alt="" />
            </div>
            <div class="offer__card-title">24/7 Support</div>
            <div class="offer__card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus
              gravida.</div>
          </div>
          <div class="offer__card">
            <div class="offer__card-image">
              <img src={cashback} alt="" />
            </div>
            <div class="offer__card-title">24/7 Support</div>
            <div class="offer__card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus
              gravida.</div>
          </div>
          <div class="offer__card">
            <div class="offer__card-image">
              <img src={premiumQuality} alt="" />
            </div>
            <div class="offer__card-title">24/7 Support</div>
            <div class="offer__card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus
              gravida.</div>
          </div>
          <div class="offer__card">
            <div class="offer__card-image">
              <img src={hoursSupport} alt="" />
            </div>
            <div class="offer__card-title">24/7 Support</div>
            <div class="offer__card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus
              gravida.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Offer;