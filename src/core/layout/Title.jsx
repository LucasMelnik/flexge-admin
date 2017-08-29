import React from 'react';
import PropTypes from 'prop-types';

const Title = props => (
  <div className="page-title">
    <div className="pull-left">
      <h1 className="title">
        {props.children}
      </h1>
    </div>
  </div>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
