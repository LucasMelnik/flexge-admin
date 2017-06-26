import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';

const DashboardFilter = props => (
 <Paper>
   <FetchAutoComplete
     url="courses?page=1&size=100"
     defaultSelect
     disabled={props.submitting}
     label="Course"
     value={get(props.values, 'course.name', '')}
     onSelect={course => props.onChange('course', course)}
     resultTransformer={{
       text: 'name',
       value: 'id',
     }}
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