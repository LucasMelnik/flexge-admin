import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Select from '../../../core/form/Select';

const SchoolEvaluationFilter = props => (
  <Row>
    <Column size={3}>
      <Select
        label="Select the year to config the evaluation periods"
        value={props.value}
        options={props.years.map(year => ({
          label: year.toString(),
          value: year,
        }))}
        onChange={value => props.onFilter(value)}
      />
    </Column>
  </Row>
);

SchoolEvaluationFilter.propTypes = {
  value: PropTypes.number,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
  onFilter: PropTypes.func.isRequired,
};

SchoolEvaluationFilter.defaultProps = {
  value: null,
};

export default SchoolEvaluationFilter;
