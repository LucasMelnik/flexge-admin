import React from 'react';
import PropTypes from 'prop-types';
import './SubTitle.css';

const SubTitle = props => (
  <h2 className="sub-title">
    {props.children}
  </h2>
);

SubTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SubTitle;
