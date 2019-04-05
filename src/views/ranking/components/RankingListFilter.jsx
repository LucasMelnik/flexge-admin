import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../core/form/FetchSelect';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Button from '../../../core/form/Button';

const RankingListFilter = props => (
  <Row>
    <Column size={3}>
      <FetchSelect
        label="Academic Plan"
        placeholder="Select the academic plan"
        value={get(props.values, 'academicPlan', '')}
        onChange={name => props.onChange('academicPlan', name)}
        errorText={get(props.errors, 'academicPlan', '')}
        url="academic-plans"
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER' || localStorage.role === 'COMPANY_MANAGER') && (
      <Column size={3}>
        <FetchSelect
          label="School"
          placeholder="Select the school to check the ranking"
          value={get(props.values, 'school', '')}
          onChange={name => props.onChange('school', name)}
          errorText={get(props.errors, 'school', '')}
          url="schools"
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    )}
    {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER') && (
      <Column size={2}>
        <FetchSelect
          label="Country"
          placeholder="Select the country to check the national ranking"
          value={get(props.values, 'country', '')}
          onChange={name => props.onChange('country', name)}
          errorText={get(props.errors, 'country', '')}
          url="countries"
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    )}
    {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER') && (
      <Column size={2}>
        <FetchSelect
          label="Region"
          placeholder="Select the region to check the regional ranking"
          value={get(props.values, 'region', '')}
          onChange={name => props.onChange('region', name)}
          errorText={get(props.errors, 'region', '')}
          url={`regions?country=${get(props.values, 'country', null)}`}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    )}
    <Column size={2}>
      <div style={{ height: 42 }} />
      <Button
        icon="search"
        label="Search"
        onClick={props.onSearch}
      />
    </Column>
  </Row>
);

RankingListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

RankingListFilter.defaultProps = {
  errors: {},
};

export default RankingListFilter;
