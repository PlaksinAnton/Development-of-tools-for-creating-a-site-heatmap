import React from 'react';
import home1 from "../assets/imgs/home-1.png";
import home2 from "../assets/imgs/home-2.png";
import home3 from "../assets/imgs/home-3.png";

const LeatestBlog = (props) => {
  return (
    <section class="leatest-blog">
      <div class="container leatest-blog__container">
        <h3 class="leatest-blog__title title">Leatest Blog</h3>
        <div class="leatest-blog__cards">
          <div class="leatest-blog__card">
            <div class="leatest-blog__img">
              <img src={home1} alt="" />
              <div class="leatest-blog__img-description">
                <div class="leatest-blog__write">SaberAli</div>
                <div class="leatest-blog__date">21 August,2020</div>
              </div>
            </div>
            <div class="leatest-blog__description">
              <div class="leatest-blog__name">Top esssential Trends in 2021</div>
              <div class="leatest-blog__text">More off this less hello samlande lied much
                over tightly circa horse taped mightly</div>
              <a href="" class="leatest-blog__more">Read More</a>
            </div>
          </div>
          <div class="leatest-blog__card">
            <div class="leatest-blog__img">
              <img src={home2} alt="" />
              <div class="leatest-blog__img-description">
                <div class="leatest-blog__write">Surfauxion</div>
                <div class="leatest-blog__date">21 August,2020</div>
              </div>
            </div>
            <div class="leatest-blog__description">
              <div class="leatest-blog__name leatest-blog__name--middle">Top esssential Trends in 2021</div>
              <div class="leatest-blog__text">More off this less hello samlande lied much
                over tightly circa horse taped mightly</div>
              <a href="" class="leatest-blog__more leatest-blog__more--middle">Read More</a>
            </div>
          </div>
          <div class="leatest-blog__card">
            <div class="leatest-blog__img">
              <img src={home3} alt="" />
              <div class="leatest-blog__img-description">
                <div class="leatest-blog__write">SaberAli</div>
                <div class="leatest-blog__date">21 August,2020</div>
              </div>
            </div>
            <div class="leatest-blog__description">
              <div class="leatest-blog__name">Top esssential Trends in 2021</div>
              <div class="leatest-blog__text">More off this less hello samlande lied much
                over tightly circa horse taped mightly</div>
              <a href="" class="leatest-blog__more">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default LeatestBlog;