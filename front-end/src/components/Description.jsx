import React from 'react';
import arrowDetail from "../assets/imgs/arrow-detail.svg";
import arrowBlue from "../assets/imgs/arrow-blue.svg";

const Description = (props) => {
  return (
    <section class="description">
      <div class="container">
        <div class="description-container">
          <div class="description__menu">
            <span class="description__item description__item--underlined"
            >Description</span
            >
            <span class="description__item">Additional Info</span>
            <span class="description__item">Reviews</span>
            <span class="description__item">Video</span>
          </div>
          <div class="description__various">
            <span class="various-main">Varius tempor.</span>
            <span class="various-description"
            >Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor
              ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris
              varius ac est bibendum. Scelerisque a, risus ac ante. Velit
              consectetur neque, elit, aliquet. Non varius proin sed urna,
              egestas consequat laoreet diam tincidunt. Magna eget faucibus cras
              justo, tortor sed donec tempus. Imperdiet consequat, quis diam
              arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate
              nunc nec. Dui, massa viverr .</span
            >
          </div>
          <div class="description__details">
            <span class="more-details">More details</span>
            <div class="details-about">
              <img
                src={arrowDetail}
                alt="Icon: arrow"
                class="arrow-detail"
              />
              <div class="details-about__description">
                Aliquam dis vulputate vulputate integer sagittis. Faucibus ds
                diam arcu, nulla lobortis justo netus dis. Eu in fringilla
                vulputate nunc nec. Dui, massa viverr .
              </div>
            </div>
            <div class="details-about">
              <img
                src={arrowBlue}
                alt="Icon: arrow"
                class="arrow-detail"
              />
              <div class="details-about__description">
                Aliquam dis vulputate vulputate integer sagittis. Faucibus ds
                diam arcu, nulla lobortis justo netus dis. Eu in fringilla
                vulputate nunc nec. Dui, massa viverr .
              </div>
            </div>
            <div class="details-about">
              <img
                src={arrowDetail}
                alt="Icon: arrow"
                class="arrow-detail"
              />
              <div class="details-about__description">
                Aliquam dis vulputate vulputate integer sagittis. Faucibus ds
                diam arcu, nulla lobortis justo netus dis. Eu in fringilla
                vulputate nunc nec. Dui, massa viverr .
              </div>
            </div>
            <div class="details-about">
              <img
                src={arrowDetail}
                alt="Icon: arrow"
                class="arrow-detail"
              />
              <div class="details-about__description">
                Aliquam dis vulputate vulputate integer sagittis. Faucibus ds
                diam arcu, nulla lobortis justo netus dis. Eu in fringilla
                vulputate nunc nec. Dui, massa viverr .
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Description;