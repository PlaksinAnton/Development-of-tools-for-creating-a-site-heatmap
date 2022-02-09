import React from 'react';
import post from '../assets/imgs/post.svg';

const Example = (props) => {
//Пример хэдера, вставлять на все страницы

    return (
            <header className="header">
                <div className="header-up">
                    <div className="container header-up__container">
                        <div className="header-up__left">
                            <div className="header-email">
                                <img src={post} alt="post picture" className="email-pic"/>
                                    mhhasanul@gmail.com
                            </div>
                            <div className="header-tel">
                                <img src="./imgs/tel.svg" alt="telephone picture" className="tel-pic"/>
                                    (12345)67890
                            </div>
                        </div>
                        <ul className="header-up__right">
                            <li>
                                <button className="header-button">
                                    <div className="header-button__text">English</div>
                                    <img src="./imgs/arrow.svg" alt="" className="arrow"/>
                                </button>
                            </li>
                            <li>
                                <button className="header-button">
                                    <div className="header-button__text">USD</div>
                                    <img src="./imgs/arrow.svg" alt="" className="arrow"/>
                                </button>
                            </li>
                            <li>
                                <button className="header-button">
                                    <div className="header-button__text">Login</div>
                                    <img src="./imgs/user.svg" alt="" className="user"/>
                                </button>
                            </li>
                            <li>
                                <button className="header-button">
                                    <div className="header-button__text">WishList</div>
                                    <img src="./imgs/heart.svg" alt="" className="heart"/>
                                </button>
                            </li>
                            <li>
                                <button className="header-button header-button__last">
                                    <img src="./imgs/basket.svg" alt="" className="basket"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="header-down">
                    <div className="container header-down__container">
                        <div className="header-down__left">
                            <div className="header-logo">Hekto</div>
                            <ul className="navbar">
                                <li>
                                    <a className="header-link header-link__red">
                                        Home
                                        <img src="./imgs/arrow-red.svg" alt="" className="arrow"/>
                                    </a>
                                </li>
                                <li><a className="header-link" href="grid.html">Pages</a></li>
                                <li><a className="header-link" href="grid.html">Products</a></li>
                                <li><a className="header-link" href="grid.html">Blog</a></li>
                                <li><a className="header-link" href="grid.html">Shop</a></li>
                                <li><a className="header-link" href="grid.html">Contact</a></li>
                            </ul>
                        </div>
                        <form action="#" className="search">
                            <input type="text" className="search__input" placeholder=""/>
                            <button className="search__button">
                                <img src="imgs/search.svg" alt="Icon: search"/>
                            </button>
                        </form>
                    </div>
                </div>
            </header>
    )
}
export default Example;