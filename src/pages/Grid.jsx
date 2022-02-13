import React from 'react';
import GridDefault from '../components/GridDefault.jsx';
import MainItems from '../components/MainItems.jsx';


const Grid = (props) => {
  return (
    <>
      <GridDefault name="Shop Grid Default" />
      <MainItems />
    </>
  )
}
export { Grid };