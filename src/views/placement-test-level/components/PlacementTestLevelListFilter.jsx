import React from 'react';
import PropTypes from 'prop-types';
import FetchSelect from '../../../core/form/FetchSelect';

const PlacementTestLevelListFilter = props => (
  <FetchSelect
    showSearch
    url="courses"
    label="Course"
    value={props.course}
    onChange={props.onChange}
    resultTransformer={{
      text: 'name',
      value: 'id',
    }}
  />
);

PlacementTestLevelListFilter.propTypes = {
  course: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PlacementTestLevelListFilter;
