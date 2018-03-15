import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../../core/form/FetchSelect';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Button from '../../../../core/form/Button';

const UnitAverageExecutionTimeListFilter = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <FetchSelect
          url="/courses"
          label="Select the course"
          disabled={props.fetching}
          value={get(props.values, 'course')}
          onChange={(value) => {
            props.onChange('course', value);
            props.onChange('module', null);
          }}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={4}>
        <FetchSelect
          label="Filter by module"
          placeholder="Select the course to allow select the  module"
          url={props.values.course && `/modules?query[course]=${get(props.values, 'course', '')}`}
          disabled={props.fetching || !props.values.course}
          value={get(props.values, 'module')}
          onChange={(value) => {
            props.onChange('module', value);
          }}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <div style={{ height: 32 }} />
        <Button
          disabled={props.fetching}
          icon="search"
          buttonType="submit"
          label="Search"
        />
      </Column>
    </Row>
  </form>
);

UnitAverageExecutionTimeListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
};

UnitAverageExecutionTimeListFilter.defaultProps = {
  fetching: false,
};

export default UnitAverageExecutionTimeListFilter;
