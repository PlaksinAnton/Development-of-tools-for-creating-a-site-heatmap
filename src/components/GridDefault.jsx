import React from 'react';

const GridDefault = (props) => {
  return (
    <section class="grid-default">
      <div class="container">
        <div class="grid-default__main">
          <div class="shop">{props.name}</div>
          <span class="home">Home </span>
          <span class="dot">.</span>
          <span class="pages">Pages</span>
          <span class="pink-dot">.</span>
          <span class="shop-little">{props.name}</span>
        </div>
      </div>
    </section>
  )
}
export default GridDefault;