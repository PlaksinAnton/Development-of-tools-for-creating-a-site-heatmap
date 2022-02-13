import React from 'react';
import sofaUnique from '../assets/imgs/sofa-unique.png';

const UniqueFeatures = (props) => {
  return (
    <section class="unique-features">
      <div class="container unique-features__container">
        <div class="unique-features__img">
          <img src={sofaUnique} alt="" />
        </div>
        <div class="unique-features__content">
          <h3 class="unique-features__title title">Unique Features Of leatest &
            Trending Poducts</h3>
          <ul class="unique-features__list">
            <li class="unique-features__li unique-features__li--first">All frames constructed with hardwood solids and
              laminates</li>
            <li class="unique-features__li unique-features__li--second">Reinforced with double wood dowels, glue,
              screw
              -
              nails corner
              blocks and machine nails</li>
            <li class="unique-features__li unique-features__li--third">Arms, backs and seats are structurally
              reinforced
            </li>
          </ul>
          <div class="unique-features__button-block">
            <button class="unique-features__button">Add to cart</button>
            <div class="unique-features__description">
              <span class="unique-features__name">B&B Italian Sofa</span>
              <span class="unique-features__price">$32.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default UniqueFeatures;