import React from 'react';
import char1 from "../assets/imgs/chair-1.svg";
import char2 from "../assets/imgs/chair-2.svg";
import char3 from "../assets/imgs/chair-3.svg";
import char4 from "../assets/imgs/chair-4.svg";

const FeaturedProducts = (props) => {
  return (
    <section class="featured-products">
      <div class="container featured-products__container">
        <h3 class="title featured-products__title">Featured Products</h3>
        <div class="featured-products__slider">
          <div class="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="swiper-slide__image">
                  <img src={char1} alt="Chair" class="" />
                </div>
                <div class="swiper-slide__description">
                  <h6 class="swiper-slide__title"><a href="product.html">Cantilever chair</a></h6>
                  <div class="swiper-slide__colors">
                    <div class="swiper-slide__color swiper-slide__colors--green"></div>
                    <div class="swiper-slide__color swiper-slide__colors--pink"></div>
                    <div class="swiper-slide__color swiper-slide__colors--blue"></div>
                  </div>
                  <div class="swiper-slide__code">Code - Y523201</div>
                  <div class="swiper-slide__price">$42.00</div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="swiper-slide__image">
                  <img src={char2} alt="Chair" class="" />
                </div>
                <div class="swiper-slide__description">
                  <h6 class="swiper-slide__title"><a href="product.html">Cantilever chair</a></h6>
                  <div class="swiper-slide__colors">
                    <div class="swiper-slide__color swiper-slide__colors--green"></div>
                    <div class="swiper-slide__color swiper-slide__colors--pink"></div>
                    <div class="swiper-slide__color swiper-slide__colors--blue"></div>
                  </div>
                  <div class="swiper-slide__code">Code - Y523201</div>
                  <div class="swiper-slide__price">$42.00</div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="swiper-slide__image">
                  <img src={char3} alt="Chair" class="" />
                </div>
                <div class="swiper-slide__description">
                  <h6 class="swiper-slide__title"><a href="product.html">Cantilever chair</a></h6>
                  <div class="swiper-slide__colors">
                    <div class="swiper-slide__color swiper-slide__colors--green"></div>
                    <div class="swiper-slide__color swiper-slide__colors--pink"></div>
                    <div class="swiper-slide__color swiper-slide__colors--blue"></div>
                  </div>
                  <div class="swiper-slide__code">Code - Y523201</div>
                  <div class="swiper-slide__price">$42.00</div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="swiper-slide__image">
                  <img src={char4} alt="Chair" class="" />
                </div>
                <div class="swiper-slide__description">
                  <h6 class="swiper-slide__title"><a href="product.html">Cantilever chair</a></h6>
                  <div class="swiper-slide__colors">
                    <div class="swiper-slide__color swiper-slide__colors--green"></div>
                    <div class="swiper-slide__color swiper-slide__colors--pink"></div>
                    <div class="swiper-slide__color swiper-slide__colors--blue"></div>
                  </div>
                  <div class="swiper-slide__code">Code - Y523201</div>
                  <div class="swiper-slide__price">$42.00</div>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default FeaturedProducts;