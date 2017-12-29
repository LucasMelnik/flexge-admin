import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../../../../../core/layout/Tag';

const B2Projection = props => (
  <Tag
    color="none"
    style={{
      height: 'auto',
      padding: 10,
      textAlign: 'center',
    }}
  >
    <span>B2 Projection</span>
    <br />
    <h1>{!!props.projection ? props.projection : '-'}</h1>
  </Tag>
);

B2Projection.propTypes = {
  projection: PropTypes.number,
};

B2Projection.defaultProps = {
  projection: null,
};

export default B2Projection;
