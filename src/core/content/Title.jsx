import React from 'react';
import PropTypes from 'prop-types';
import './Title.css';

const Title = props => (
  <h1 className="title">{props.children}</h1>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
