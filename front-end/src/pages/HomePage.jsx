import React from 'react';
import HomeTitle from '../components/HomeTitle.jsx';
import FeaturedProducts from '../components/FeaturedProducts.jsx';
import LeatestProducts from '../components/LeatestProducts.jsx';
import Offer from '../components/Offer.jsx';
import UniqueFeatures from '../components/UniqueFeatures.jsx';
import TrendingProducts from '../components/TrendingProducts.jsx';
import DiscountItem from '../components/DiscountItem.jsx';
import Top from '../components/Top.jsx';
import Subscribe from '../components/Subscribe.jsx';
import Brends from '../components/Brends.jsx';
import LeatestBlog from '../components/LeatestBlog.jsx';

const HomePage = (props) => {
  return (
    <>
      <HomeTitle />
      <FeaturedProducts />
      <LeatestProducts />
      <Offer />
      <UniqueFeatures />
      <TrendingProducts />
      <DiscountItem />
      <Top />
      <Subscribe />
      <Brends />
      <LeatestBlog />
    </>
  )
}
export { HomePage };