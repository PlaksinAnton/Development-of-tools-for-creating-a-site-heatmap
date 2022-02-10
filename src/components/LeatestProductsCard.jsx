import React from 'react';

function LeatestProductsCard(props) {
  const way = props.number;
  return (
    <div class="leatest-products__card">
      <div class="leatest-products__card-image">
        <img src={way} alt="Chair" class="" />
      </div>
      <div class="leatest-products__card-down">
        <div class="leatest-products__line"></div>
        <span class="leatest-products__card-name">Comfort Handy Craft</span>
        <div class="leatest-products__prices">
          <span class="leatest-products__card-price">$42.00</span>
          <span class="leatest-products__card-price leatest-products__card-price--old">$65.00</span>
        </div>
      </div>
    </div>
  )
}
export default LeatestProductsCard;