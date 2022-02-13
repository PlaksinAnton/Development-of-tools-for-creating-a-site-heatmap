import React from 'react';
import Description from '../components/Description';
import GridDefault from '../components/GridDefault';
import Playwood from '../components/Playwood';
import Related from '../components/Related';

const Product = (props) => {
  return (
    <>
      <GridDefault name="Product Details" />
      <Playwood />
      <Description />
      <Related />
    </>
  )
}
export { Product };