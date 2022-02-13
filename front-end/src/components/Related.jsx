import React from 'react';
import relatedMan from "../assets/imgs/related-man.png";
import star from "../assets/imgs/star.png";
import emptyStar from "../assets/imgs/empty-star.png";
import relatedWomanThird from "../assets/imgs/related-woman-third.png";
import relatedWomanSecond from "../assets/imgs/related-woman-second.png";
import relatedWomanFourth from "../assets/imgs/related-woman-fourth.png";
import mainBrends from "../assets/imgs/main-brends.png"


const Related = (props) => {
  return (
    <section class="related">
      <div class="container">
        <div class="related-container">
          <span class="related-products">Related Products</span>
          <div class="related-photos">
            <div class="related-photos__item">
              <div class="related-photo">
                <img
                  src={relatedMan}
                  alt="Related man"
                  class="related-img"
                />
              </div>
              <div class="related-description">
                <div class="related-description__up">
                  <span class="related-wear">Mens Fashion Wear</span>
                  <div class="related-stars">
                    <img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={emptyStar}
                      alt="Star"
                      class="related-star"
                    />
                  </div>
                </div>
                <span class="related-cost">$43.00</span>
              </div>
            </div>
            <div class="related-photos__item">
              <div class="related-photo">
                <img
                  src={relatedWomanThird}
                  alt="Related man"
                  class="related-img"
                />
              </div>
              <div class="related-description">
                <div class="related-description__up">
                  <span class="related-wear">Women’s Fashion</span>
                  <div class="related-stars">
                    <img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    />
                  </div>
                </div>
                <span class="related-cost">$67.00</span>
              </div>
            </div>
            <div class="related-photos__item">
              <div class="related-photo">
                <img
                  src={relatedWomanSecond}
                  alt="Related man"
                  class="related-img"
                />
              </div>
              <div class="related-description">
                <div class="related-description__up">
                  <span class="related-wear">Wolx Dummy Fashion</span>
                  <div class="related-stars">
                    <img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={emptyStar}
                      alt="Star"
                      class="related-star"
                    />
                  </div>
                </div>
                <span class="related-cost">$67.00</span>
              </div>
            </div>
            <div class="related-photos__item">
              <div class="related-photo">
                <img
                  src={relatedWomanFourth}
                  alt="Related man"
                  class="related-img"
                />
              </div>
              <div class="related-description">
                <div class="related-description__up">
                  <span class="related-wear">Top Wall Digital Clock</span>
                  <div class="related-stars">
                    <img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={star}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={emptyStar}
                      alt="Star"
                      class="related-star"
                    /><img
                      src={emptyStar}
                      alt="Star"
                      class="related-star"
                    />
                  </div>
                </div>
                <span class="related-cost">$51.00</span>
              </div>
            </div>
          </div>
          <img
            src={mainBrends}
            alt="Main brends"
            class="related-brends"
          />
        </div>
      </div>
    </section>
  )
}
export default Related;