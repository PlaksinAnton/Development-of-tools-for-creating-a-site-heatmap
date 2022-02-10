import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import HomeTitle from './HomeTitle.jsx';
import FeaturedProducts from './FeaturedProducts.jsx';
import LeatestProducts from './LeatestProducts.jsx';
import Offer from './Offer.jsx';
import UniqueFeatures from './UniqueFeatures.jsx';
import TrendingProducts from './TrendingProducts.jsx';
import DiscountItem from './DiscountItem.jsx';
import Top from './Top.jsx';
import Subscribe from './Subscribe.jsx';
import Brends from './Brends.jsx';
import LeatestBlog from './LeatestBlog.jsx';
const HomePage = (props) => {
    return (
        <>
            <Header />
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
            <Footer />
        </>
    )
}
export default HomePage;