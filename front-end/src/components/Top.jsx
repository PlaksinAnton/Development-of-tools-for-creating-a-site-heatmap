import React from 'react';
import topChair1 from "../assets/imgs/top-chair-1.png";
import topChair2 from "../assets/imgs/top-chair-2.png";
import topChair3 from "../assets/imgs/top-chair-3.png";
import topChair4 from "../assets/imgs/top-chair-4.png";

const Top = (props) => {
  return (
    <section class="top">
      <div class="container top__container">
        <h3 class="top__title title">Top Categories</h3>
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide swiper-slide--top">
              <div class="swiper-slide__image swiper-slide__image--top">
                <img src={topChair1} alt="Chair" class="" />
              </div>
              <div class="swiper-slide__description">
                <h6 class="swiper-slide__title swiper-slide__title--top">Mini LCW Chair</h6>
                <div class="swiper-slide__price swiper-slide__price--top">$56.00</div>
              </div>
            </div>
            <div class="swiper-slide swiper-slide--top">
              <div class="swiper-slide__image swiper-slide__image--top">
                <img src={topChair2} alt="Chair" class="" />
              </div>
              <div class="swiper-slide__description">
                <h6 class="swiper-slide__title swiper-slide__title--top">Mini LCW Chair</h6>
                <div class="swiper-slide__price swiper-slide__price--top">$56.00</div>
              </div>
            </div>
            <div class="swiper-slide swiper-slide--top">
              <div class="swiper-slide__image swiper-slide__image--top">
                <img src={topChair3} alt="Chair" class="" />
              </div>
              <div class="swiper-slide__description">
                <h6 class="swiper-slide__title swiper-slide__title--top">Mini LCW Chair</h6>
                <div class="swiper-slide__price swiper-slide__price--top">$56.00</div>
              </div>
            </div>
            <div class="swiper-slide swiper-slide--top">
              <div class="swiper-slide__image swiper-slide__image--top">
                <img src={topChair4} alt="Chair" class="" />
              </div>
              <div class="swiper-slide__description">
                <h6 class="swiper-slide__title swiper-slide__title--top">Mini LCW Chair</h6>
                <div class="swiper-slide__price swiper-slide__price--top">$56.00</div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination--top"></div>
        </div>
      </div>
    </section>
  )
}
export default Top;