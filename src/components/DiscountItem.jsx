import React from 'react';
import discountSofa from "../assets/imgs/discount-sofa.png";

const DiscountItem = (props) => {
  return (
    <section class="discount-item">
      <div class="container discount-item__container">
        <h3 class="discount-item__title title">Discount Item</h3>
        <ul class="leatest-products__filter discount-item__filter">
          <li class="leatest-products__new discount-item__dot">Wood Chair</li>
          <li class="leatest-products__best discount-item__margin">Plastic Chair</li>
          <li class="leatest-products__special">Sofa Colletion</li>
        </ul>
        <div class="discount-item__content">
          <div class="discount-item__description">
            <div class="discount-item__name">20% Discount Of All Products</div>
            <div class="discount-item__subname">Eams Sofa Compact</div>
            <div class="home-title__description discount-item__desc">Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Eu eget
              feugiat habitasse nec, bibendum condimentum.</div>
            <div class="discount-item__list">
              <div class="discount-item__li">Material expose like metals</div>
              <div class="discount-item__li">Clear lines and geomatric figures</div>
              <div class="discount-item__li">Simple neutral colours.</div>
              <div class="discount-item__li">Material expose like metals</div>
            </div>
            <div class="home-title__button discount-item__button">Shop Now</div>
          </div>
          <div class="discount-item__image">
            <img src={discountSofa} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
export default DiscountItem;