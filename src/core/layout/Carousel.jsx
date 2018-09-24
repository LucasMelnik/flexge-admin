import React from 'react';
import PropTypes from 'prop-types';
import { Carousel as AntCarousel } from 'antd';

const Carousel = props => (
  <AntCarousel
    {...props}
    arrows
    effect="center"
  />
);

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Carousel;
