import React from "react";
import post from "../assets/imgs/post.svg";
import tel from "../assets/imgs/tel.svg";
import arrow from "../assets/imgs/arrow.svg";
import user from "../assets/imgs/user.svg";
import heart from "../assets/imgs/heart.svg";
import basket from "../assets/imgs/basket.svg";
import arrowRed from "../assets/imgs/arrow-red.svg";
import search from "../assets/imgs/search.svg";
import { Link } from "react-router-dom";
import axios from "axios";

// const testHu = async () => {
//   const json = {
//     test: "test",
//   };
//   await axios.post(`http://127.0.0.1:5000/login`, json).then((response) => {
//     console.log(response);
//   });
// };

const Header = (props) => {
  return (
    <header className="header">
      <div className="header-up">
        <div className="container header-up__container">
          <div className="header-up__left">
            <div className="header-email">
              <img src={post} alt="post picture" className="email-pic" />
              mhhasanul@gmail.com
            </div>
            <div className="header-tel">
              <img src={tel} alt="telephone picture" className="tel-pic" />
              (12345)67890
            </div>
          </div>
          <ul className="header-up__right">
            <li>
              <button className="header-button">
                <div className="header-button__text">English</div>
                <img src={arrow} alt="" className="arrow" />
              </button>
            </li>
            <li>
              <button className="header-button">
                <div className="header-button__text">USD</div>
                <img src={arrow} alt="" className="arrow" />
              </button>
            </li>
            <li>
              <button className="header-button">
                <div className="header-button__text">Login</div>
                <img src={user} alt="" className="user" />
              </button>
            </li>
            <li>
              <button className="header-button">
                <div className="header-button__text">WishList</div>
                <img src={heart} alt="" className="heart" />
              </button>
            </li>
            <li>
              <button className="header-button header-button__last">
                <img src={basket} alt="" className="basket" />
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
                <Link className="header-link header-link__red" to="/">
                  Home
                  <img src={arrowRed} alt="" className="arrow" />
                </Link>
              </li>
              <li>
                <Link className="header-link" to="/grid">
                  Pages
                </Link>
              </li>
              <li>
                <Link className="header-link" to="/product">
                  Products
                </Link>
              </li>
              <li>
                <Link className="header-link" to="/">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="header-link" to="/">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="header-link" to="/">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="header-link" to="/admin">
                  Graphics
                </Link>
              </li>
            </ul>
          </div>
          <form action="#" className="search">
            <input type="text" className="search__input" placeholder="" />
            <button className="search__button">
              <img src={search} alt="Icon: search" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
export default Header;
