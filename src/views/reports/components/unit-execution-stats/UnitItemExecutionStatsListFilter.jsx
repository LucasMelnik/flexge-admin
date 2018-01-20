import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../../core/form/FetchSelect';
import Select from '../../../../core/form/Select';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Button from '../../../../core/form/Button';

const UnitItemExecutionStatsListFilter = props => (
  <Row>
    <Column size={2}>
      <FetchSelect
        required
        url="/courses"
        label="Select the course"
        disabled={props.fetching}
        value={get(props.values, 'course')}
        onChange={value => props.onChange('course', value)}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
    <Column size={2}>
      <Select
        label="Filter Module group"
        value={get(props.values, 'moduleGroup', '')}
        onChange={value => props.onChange('moduleGroup', value)}
        disabled={props.fetching || !props.values.course}
        options={[
          {
            label: 'A',
            value: 'A',
          },
          {
            label: 'B',
            value: 'B',
          },
          {
            label: 'C',
            value: 'C',
          },
          {
            label: 'D',
            value: 'D',
          },
        ]}
      />
    </Column>
    <Column size={2}>
      <Select
        label="Filter Unit group"
        value={get(props.values, 'unitGroup', '')}
        onChange={value => props.onChange('unitGroup', value)}
        disabled={props.fetching || !props.values.course}
        options={[
          {
            label: 'A',
            value: 'A',
          },
          {
            label: 'B',
            value: 'B',
          },
          {
            label: 'C',
            value: 'C',
          },
          {
            label: 'D',
            value: 'D',
          },
        ]}
      />
    </Column>
    <Column size={2}>
      <div
        style={{
          height: 32,
        }}
      />
      <Button
        label="Search"
        icon="search"
        onClick={props.onSearch}
      />
    </Column>
  </Row>
);

UnitItemExecutionStatsListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};

UnitItemExecutionStatsListFilter.defaultProps = {
  fetching: false,
};

export default UnitItemExecutionStatsListFilter;
