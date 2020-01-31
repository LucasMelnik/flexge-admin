import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../../core/form/FetchSelect';
import Button from '../../../../core/form/Button';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';

const SchoolRecordListFilter = props => (
  <div>
    <Row>
      {['ADMIN', 'DISTRIBUTOR_MANAGER'].some(role => role === localStorage.role) && (
        <Column size={3}>
          <FetchSelect
            showSearch
            isPaginated
            url="/companies"
            label="Company"
            disabled={props.fetching}
            value={get(props.values, 'company', '')}
            onChange={company => props.onChange('company', company)}
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
          isPaginated
          url="/schools"
          params={{
            ...get(props.values, 'company', false) && {
              company: get(props.values, 'company', '')
            }
          }}
          label="School"
          disabled={props.fetching}
          value={get(props.values, 'school', '')}
          onChange={school => props.onChange('school', school)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <div style={{ height: 42 }} />
        <Button
          icon="search"
          label="Search"
          onClick={props.onSearch}
        />
      </Column>
    </Row>
  </div>
);

SchoolRecordListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};

SchoolRecordListFilter.defaultProps = {
  fetching: false,
};

export default SchoolRecordListFilter;
