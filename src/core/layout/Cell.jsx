import React from 'react';
import PropTypes from 'prop-types';

const Cell = props => (
  <div
    className={`
      mdl-cell
      mdl-cell--${props.sizeDesktop}-col
      mdl-cell--${props.sizeTablet}-col-tablet
      mdl-cell--${props.sizePhone}-col-phone
      ${props.offsetDesktop && `mdl-cell--${props.offsetDesktop}-offset`}
      ${props.offsetMobile && `mdl-cell--${props.offsetMobile}-offset`}
      ${props.offsetPhone && `mdl-cell--${props.offsetPhone}-offset`}
      ${props.hideDesktop && 'mdl-cell--hide-desktop'}
      ${props.hideTablet && 'mdl-cell--hide-tablet'}
      ${props.hidePhone && 'mdl-cell--hide-phone'}
      ${props.align && `mdl-cell--${props.align}`}
    `}
  >
    {props.children}
  </div>
);

Cell.propTypes = {
  children: PropTypes.node.isRequired,
  sizeDesktop: PropTypes.number.isRequired,
  sizeTablet: PropTypes.number.isRequired,
  sizePhone: PropTypes.number.isRequired,
  offsetDesktop: PropTypes.number,
  offsetMobile: PropTypes.number,
  offsetPhone: PropTypes.number,
  hideDesktop: PropTypes.bool,
  hideTablet: PropTypes.bool,
  hidePhone: PropTypes.bool,
  align: PropTypes.oneOf(['stretch', 'top', 'middle', 'bottom']),
};

Cell.defaultProps = {
  offsetDesktop: null,
  offsetMobile: null,
  offsetPhone: null,
  hideDesktop: false,
  hideTablet: false,
  hidePhone: false,
  align: null,
};

export default Cell;
