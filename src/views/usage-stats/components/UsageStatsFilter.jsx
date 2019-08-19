import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import FetchSelect from '../../../core/form/FetchSelect';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import MonthInput from '../../../core/form/MonthInput';
import RangeDateInput from '../../../core/form/RangeDateInput';
import Select from '../../../core/form/Select';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';

const UsageStatsFilter = props => (
  <Row>
    <Column size={1}>
      <Select
        label="Filter Type"
        required
        disabled={props.fetching}
        value={props.filterType}
        onChange={props.onFilterTypeChange}
        options={[
          {
            label: 'By month',
            value: 'month'
          },
          {
            label: 'By custom period',
            value: 'date-range'
          },
        ]}
      />
    </Column>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'SPEECHACE') && (
      <Column size={3}>
        <FetchSelect
          showSearch
          required={props.filterType === 'date-range'}
          label="Filter by Distributor"
          disabled={props.fetching}
          value={get(props.values, 'distributor', '')}
          onChange={value => props.onChange('distributor', value)}
          url="/distributors"
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
          errorText={get(props.errors, 'distributor', '')}
        />
      </Column>
    )}
    {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER') && (
      <Column size={3}>
        <FetchSelect
          showSearch
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
    {props.filterType === 'month' && (
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
    )}
    {props.filterType === 'date-range' && (
      <Column size={2}>
        <RangeDateInput
          required
          label="Custom Period"
          disabled={props.fetching}
          onChange={(dates) => {
            props.onChange('from', dates[0]);
            props.onChange('to', dates[1]);
          }}
          placeholder={['From', 'To']}
          value={[get(props.values, 'from', undefined), get(props.values, 'to', undefined)]}
          errorText={get(props.errors, 'from', '')}
        />
      </Column>
    )}
    <Column size={2}>
      <div style={{ height: 42 }} />
      <Button
        label="Search"
        icon="search"
        onClick={props.onSearch}
      />
      <ColumnSeparator size="xs" />
      {props.filterType === 'date-range' && (
        <Button
          label="Export data"
          icon="download"
          loading={props.downloading}
          disabled={props.fetching}
          onClick={props.onExport}
        />
      )}
    </Column>
  </Row>
);

UsageStatsFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired,
  onFilterTypeChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
  onExport: PropTypes.func,
  downloading: PropTypes.bool,
  errors: PropTypes.object,
};

UsageStatsFilter.defaultProps = {
  fetching: false,
  downloading: false,
  onSearch: null,
  onExport: null,
  errors: {},
};

export default UsageStatsFilter;
