import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import FetchSelect from '../../../core/form/FetchSelect';

const DashboardFilter = props => (
 <Paper>
   <FetchSelect
     url="courses?page=1&size=100"
     disabled={props.submitting}
     label="Course"
     defaultSelect
     value={get(props.values, 'course', '')}
     onChange={course => props.onChange('course', course)}
   />
 </Paper>
);

DashboardFilter.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
};

DashboardFilter.defaultProps = {
  values:{},
  onChange: null,
};

export default DashboardFilter;