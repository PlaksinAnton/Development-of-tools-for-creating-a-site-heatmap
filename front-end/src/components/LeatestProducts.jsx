import React from 'react';
import LeatestProductsCard from './LeatestProductsCard';
import sofa1 from "../assets/imgs/sofa-1.svg"
import sofa2 from "../assets/imgs/sofa-2.svg"
import sofa3 from "../assets/imgs/sofa-3.svg"
import sofa4 from "../assets/imgs/sofa-4.svg"
import sofa5 from "../assets/imgs/sofa-5.svg"
import sofa6 from "../assets/imgs/sofa-6.svg"

const LeatestProducts = (props) => {
  return (
    <section class="leatest-products">
      <div class="container leatest-products__container">
        <h3 class="title leatest-products__title">Leatest Products</h3>
        <ul class="leatest-products__filter">
          <li class="leatest-products__new">New Arrival</li>
          <li class="leatest-products__best">Best Seller</li>
          <li class="leatest-products__featured">Featured</li>
          <li class="leatest-products__special">Special Offer</li>
        </ul>
        <div class="leatest-products__grid">
          <LeatestProductsCard number={sofa1} />
          <LeatestProductsCard number={sofa2} />
          <LeatestProductsCard number={sofa3} />
          <LeatestProductsCard number={sofa4} />
          <LeatestProductsCard number={sofa5} />
          <LeatestProductsCard number={sofa6} />
        </div>
      </div>
    </section>
  )
}
export default LeatestProducts;