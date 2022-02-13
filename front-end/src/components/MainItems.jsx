import React from 'react';
import squareIcon from "../assets/imgs/square-icon.svg";
import listIcon from "../assets/imgs/list-icon.svg";
import firstPic from "../assets/imgs/first-pic.png";
import pinkPoint from "../assets/imgs/pink-point.png";
import yellowPoint from "../assets/imgs/yellow-point.png";
import purplePoint from "../assets/imgs/purple-point.png";
import secondPic from "../assets/imgs/second-pic.png";
import carIcon from "../assets/imgs/car-icon.svg";
import searchIcon from "../assets/imgs/search-icon.svg";
import heartIcon from "../assets/imgs/heart-icon.svg";
import thirdPic from "../assets/imgs/third-pic.png";
import fourthPic from "../assets/imgs/fourth-pic.png";
import fifthPic from "../assets/imgs/fifth-pic.png";
import sixPic from "../assets/imgs/six-pic.png";
import SeventhPic from "../assets/imgs/seventh-pic.png";
import eightPic from "../assets/imgs/eight-pic.png";
import ninethPic from "../assets/imgs/nineth-pic.png";
import tenPic from "../assets/imgs/ten-pic.png";
import elevenPic from "../assets/imgs/eleven-pic.png";
import twelvePic from "../assets/imgs/twelve-pic.png";
import mainBrends from "../assets/imgs/main-brends.png";

const MainItems = (props) => {
  return (
    <section class="main-items">
      <div class="container">
        <div class="main-items__container">
          <div class="eccomerce">
            <div class="eccomerce-right">
              <span class="eccomerce-right__text"
              >Ecommerce Acceories & Fashion item
              </span>
              <span class="eccomerce-right__about"
              >About 9,620 results (0.62 seconds)</span
              >
            </div>
            <div class="eccomerce-left">
              <span class="per-page">Per Page:</span>
              <input type="text" class="per-page-empty" />
              <span class="sort-by">Sort By:</span>
              <input type="text" class="best-match" placeholder="Best Match" />
              <span class="view">View:</span>
              <img
                src={squareIcon}
                alt="Square icon"
                class="svg-view-first"
              />
              <img
                src={listIcon}
                alt="List icon"
                class="svg-view-second"
              />
              <input type="text" class="last-input" />
            </div>
          </div>
          <div class="object-pictures">
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--first">
                <img
                  src={firstPic}
                  alt="First picture"
                  class="picture"
                />
              </div>
              <div class="picture-description">
                <span class="picture-description__text">Vel elit euismod</span>
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--second">
                <img
                  src={secondPic}
                  alt="Second picture"
                  class="picture"
                />
                <div class="object-pictures__buttons">
                  <button class="first-button">
                    <img
                      src={carIcon}
                      alt="Car icon"
                      class="car-icon"
                    />
                  </button>
                  <img
                    src={searchIcon}
                    alt="Search icon"
                    class="search-icon"
                  />
                  <img
                    src={heartIcon}
                    alt="Heart icon"
                    class="heart-icon"
                  />
                </div>
              </div>
              <div class="picture-description">
                <span class="picture-description__text"
                >Ultricies condimentum imperdiet</span
                >
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purple point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--third">
                <img
                  src={thirdPic}
                  alt="Third picture"
                  class="picture"
                />
              </div>
              <div class="picture-description">
                <span class="picture-description__text"
                >Vitae suspendisse sed</span
                >
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--fourth">
                <img
                  src={fourthPic}
                  alt="Fourth picture"
                  class="picture"
                />
              </div>
              <div class="picture-description">
                <span class="picture-description__text">Sed at fermentum</span>
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--fifth">
                <img
                  src={fifthPic}
                  alt="Fifth picture"
                  class="picture"
                />
              </div>
              <div class="picture-description">
                <span class="picture-description__text"
                >Fusce pellentesque at</span
                >
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--six">
                <img src={sixPic} alt="Six picture" class="picture" />
              </div>
              <div class="picture-description">
                <span class="picture-description__text"
                >Vestibulum magna laoreet</span
                >
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--seven">
                <img
                  src={SeventhPic}
                  alt="Seventh picture"
                  class="picture"
                />
              </div>
              <div class="picture-description">
                <span class="picture-description__text"
                >Sollicitudin amet orci</span
                >
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--eight">
                <img
                  src={eightPic}
                  alt="Eight picture"
                  class="picture"
                />
              </div>
              <div class="picture-description">
                <span class="picture-description__text"
                >Ultrices mauris sit</span
                >
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--nine">
                <img
                  src={ninethPic}
                  alt="Nineth picture"
                  class="picture"
                />
              </div>
              <div class="picture-description">
                <span class="picture-description__text"
                >Pellentesque condimentum ac</span
                >
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--ten">
                <img src={tenPic} alt="Ten picture" class="picture" />
              </div>
              <div class="picture-description">
                <span class="picture-description__text"
                >Cras scelerisque velit</span
                >
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--eleven">
                <img
                  src={elevenPic}
                  alt="Eleven picture"
                  class="picture"
                />
              </div>
              <div class="picture-description">
                <span class="picture-description__text"
                >Lectus vulputate faucibus</span
                >
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>=
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
            <div class="object-pictures__item">
              <div class="object-pictures__img object-pictures__img--twelve">
                <img
                  src={twelvePic}
                  alt="Twelve picture"
                  class="picture"
                />
              </div>
              <div class="picture-description">
                <span class="picture-description__text">Purus risus, ut</span>
                <div class="picture-description__points">
                  <img
                    src={yellowPoint}
                    alt="Yellow point"
                    class="yellow-point"
                  />
                  <img
                    src={pinkPoint}
                    alt="Pink point"
                    class="pink-point"
                  />
                  <img
                    src={purplePoint}
                    alt="Purplr point"
                    class="purple-point"
                  />
                </div>
                <div class="picture-description__cost">
                  <span class="first-cost">$26.00 </span>
                  <span class="second-cost">$42.00</span>
                </div>
              </div>
            </div>
          </div>
          <img
            src={mainBrends}
            alt="Main brends"
            class="main-brends"
          />
        </div>
      </div>
    </section>
  )
}
export default MainItems;