import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../core/form/FetchSelect';

const DashboardFilter = props => (
  <FetchSelect
    url="/courses"
    disabled={props.submitting}
    label="Course"
    defaultSelect
    value={get(props.values, 'course', '')}
    onChange={course => props.onChange('course', course)}
    resultTransformer={{
      text: 'name',
      value: 'id',
    }}
  />
);

DashboardFilter.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
};

DashboardFilter.defaultProps = {
  values: {},
  onChange: null,
};

export default DashboardFilter;
