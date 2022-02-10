import React from 'react';
import mainBrends from "../assets/imgs/main-brends.png";

const Brends = (props) => {
  return (
    <section class="brends">
      <div class="container brends__container">
        <img src={mainBrends} alt="Main brends" class="brends__img" />
      </div>
    </section>
  )
}
export default Brends;