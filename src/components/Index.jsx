import React from 'react';
import post from '../assets/imgs/post.svg';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
const Example = (props) => {
//Пример хэдера, вставлять на все страницы
    const count = () => {
        return "Suck" + "dick";
    }

    return (
        <>
            <Header/>
            <div>{count}</div>
            <Footer/>
        </>

    )
}
export default Example;