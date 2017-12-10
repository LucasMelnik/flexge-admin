import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';

const SchoolEvaluationFilter = props => (
  <Row>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'COMPANY_MANAGER') && (
      <Column size={3}>
        <FetchSelect
          label="Select the school"
          placeholder="Select the school to check the ranking"
          value={props.values.schoolId}
          onChange={(value) => {
            props.onChange('schoolId', value);
            props.onFilter();
          }}
          url={`schools${localStorage.role === 'COMPANY_MANAGER' ? `?company=${JSON.parse(localStorage.getItem('company')).id}` : ''}`}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
          errorText={props.errors && props.errors.schoolId}
        />
      </Column>
    )}
    {props.years.length > 0 && (
      <Column size={3}>
        <Select
          label="Select the year to config the evaluation periods"
          value={props.values.year}
          options={props.years.map(year => ({
            label: year.toString(),
            value: year,
          }))}
          onChange={(value) => {
            props.onChange('year', value);
            props.onFilter();
          }}
          errorText={props.errors && props.errors.year}
        />
      </Column>
    )}
  </Row>
);

SchoolEvaluationFilter.propTypes = {
  values: PropTypes.shape({
    year: PropTypes.number,
    schoolId: PropTypes.string,
  }),
  errors: PropTypes.shape({
    year: PropTypes.number,
    schoolId: PropTypes.string,
  }),
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
  onFilter: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

SchoolEvaluationFilter.defaultProps = {
  values: {},
};

export default SchoolEvaluationFilter;
