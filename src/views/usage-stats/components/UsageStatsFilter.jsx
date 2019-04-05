import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import FetchSelect from '../../../core/form/FetchSelect';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import MonthInput from '../../../core/form/MonthInput';

const UsageStatsFilter = props => (
  <Row>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER') && (
      <Column size={3}>
        <FetchSelect
          label="Filter by Company"
          disabled={props.fetching}
          value={get(props.values, 'company', '')}
          onChange={value => props.onChange('company', value)}
          url={`companies${localStorage.role === 'DISTRIBUTOR_MANAGER' ? `?distributor=${localStorage.getItem('distributor')}` : ''}`}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    )}
    <Column size={1}>
      <MonthInput
        required
        label="Month"
        disabled={props.fetching}
        value={get(props.values, 'month', undefined) ? props.values.month.toDate() : undefined}
        onChange={value => props.onChange('month', value)}
        errorText={get(props.errors, 'month', '')}
      />
    </Column>
    <Column size={2}>
      <div style={{ height: 42 }} />
      <Button
        label="Search"
        icon="search"
        onClick={props.onSearch}
      />
    </Column>
  </Row>
);

UsageStatsFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
  errors: PropTypes.object,
};

UsageStatsFilter.defaultProps = {
  fetching: false,
  onSearch: null,
  errors: {},
};

export default UsageStatsFilter;
