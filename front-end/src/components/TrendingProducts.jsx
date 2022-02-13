import React from 'react';
import trendChair1 from "../assets/imgs/trend-chair-1.png";
import trendChair2 from "../assets/imgs/trend-chair-2.png";
import trendChair3 from "../assets/imgs/trend-chair-3.png";
import trendChair4 from "../assets/imgs/trend-chair-4.png";
import trendChair5 from "../assets/imgs/trend-chair-5.png";
import trendChair6 from "../assets/imgs/trend-chair-6.png";
import trendChair7 from "../assets/imgs/trend-chair-7.png";
import clock from "../assets/imgs/clock.png";
import wardrobe from "../assets/imgs/wardrobe.png";

const TrendingProducts = (props) => {
  return (
    <section class="trending-products">
      <div class="container trending-products__container">
        <h3 class="trending-products__title title">Trending Products</h3>
        <div class="trending-products__up">
          <div class="trending-products__chair">
            <div class="trending-products__chair-image">
              <img src={trendChair1} alt="" class="" />
            </div>
            <div class="trending-products__name">Cantilever chair</div>
            <div class="trending-products__price">
              <span class="trending-products__price--new">$26.00</span>
              <span class="trending-products__price--old">$42.00</span>
            </div>
          </div>
          <div class="trending-products__chair">
            <div class="trending-products__chair-image">
              <img src={trendChair2} alt="" class="" />
            </div>
            <div class="trending-products__name">Cantilever chair</div>
            <div class="trending-products__price">
              <span class="trending-products__price--new">$26.00</span>
              <span class="trending-products__price--old">$42.00</span>
            </div>
          </div>
          <div class="trending-products__chair">
            <div class="trending-products__chair-image">
              <img src={trendChair3} alt="" class="" />
            </div>
            <div class="trending-products__name">Cantilever chair</div>
            <div class="trending-products__price">
              <span class="trending-products__price--new">$26.00</span>
              <span class="trending-products__price--old">$42.00</span>
            </div>
          </div>
          <div class="trending-products__chair">
            <div class="trending-products__chair-image">
              <img src={trendChair4} alt="" class="" />
            </div>
            <div class="trending-products__name">Cantilever chair</div>
            <div class="trending-products__price">
              <span class="trending-products__price--new">$26.00</span>
              <span class="trending-products__price--old">$42.00</span>
            </div>
          </div>
        </div>
        <div class="trending-products__down">
          <div class="trending-products__sale-first">
            <div class="trending-products__subtitle">23% off in all products</div>
            <div class="trending-products__sale-down">
              <a class="trending-products__shop">Shop Now</a>
              <div class="trending-products__img">
                <img src={clock} alt="" />
              </div>
            </div>
          </div>
          <div class="trending-products__sale-second">
            <div class="trending-products__subtitle">23% off in all products</div>
            <div class="trending-products__sale-down">
              <a class="trending-products__shop">View Collection</a>
              <div class="trending-products__img">
                <img src={wardrobe} alt="" />
              </div>
            </div>
          </div>
          <div class="trending-products__list">
            <div class="trending-products__li">
              <div class="trending-products__chair-image trending-products__chair-image--down">
                <img src={trendChair5} alt="" class="" />
              </div>
              <div class="trending-products__li--right">
                <div class="trending-products__name trending-products__name--right">Executive Seat chair</div>
                <span class="trending-products__price--old trending-products__price--down">$32.00</span>
              </div>
            </div>
            <div class="trending-products__li">
              <div class="trending-products__chair-image trending-products__chair-image--down">
                <img src={trendChair6} alt="" class="" />
              </div>
              <div class="trending-products__li--right">
                <div class="trending-products__name trending-products__name--right">Executive Seat chair</div>
                <span class="trending-products__price--old trending-products__price--down">$32.00</span>
              </div>
            </div>
            <div class="trending-products__li">
              <div class="trending-products__chair-image trending-products__chair-image--down">
                <img src={trendChair7} alt="" class="" />
              </div>
              <div class="trending-products__li--right">
                <div class="trending-products__name trending-products__name--right">Executive Seat chair</div>
                <span class="trending-products__price--old trending-products__price--down">$32.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default TrendingProducts;