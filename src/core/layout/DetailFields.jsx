import React from 'react';
import PropTypes from 'prop-types';
import './DetailFields.css';

const DetailFields = props => (
  <dl className="detail-list">
    <dt />
    {props.fields.map(field => (
      <dd>
        <span>{field.label}: </span>
        {field.value}
      </dd>
    ))}
  </dl>
);

DetailFields.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequried,
    values: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequried,
  })).isRequired,
};

export default DetailFields;
