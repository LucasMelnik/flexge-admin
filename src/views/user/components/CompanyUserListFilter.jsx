import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Button from '../../../core/form/Button';
import FetchSelect from '../../../core/form/FetchSelect';

const CompanyUserListFilter = props => (
  <Row>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER') && (
      <Column size={3}>
        <FetchSelect
          showSearch
          label="Filter by Company"
          disabled={props.fetching}
          value={get(props.values, 'company', '')}
          onChange={value => props.onChange('company', value)}
          url="/companies"
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    )}
    <Column size={4}>
      <FetchSelect
        showSearch
        label="Filter by School"
        disabled={props.fetching}
        value={get(props.values, 'school', '')}
        onChange={value => props.onChange('school', value)}
        url="/schools"
        params={{
          ...get(props.values, 'company', false) && {
            query: {
              company: get(props.values, 'company', ''),
            }
          }
        }}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
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

CompanyUserListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

CompanyUserListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
  errors: {},
};

export default CompanyUserListFilter;
