import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import FetchSelect from '../../../../core/form/FetchSelect';

const DistributorManagerDashboardFilter = props => (
  <Row>
    {(localStorage.role === 'ADMIN') && (
      <Column size={2.5}>
        <FetchSelect
          showSearch
          required
          label="Select the Distributor"
          value={get(props.values, 'distributor', '')}
          onChange={value => {
            props.onChange('distributor', value);
            props.onChange('company', null);
          }}
          url="/distributors"
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
          errorText={get(props.errors, 'distributor', '')}
        />
      </Column>
    )}
    <Column size={3}>
      <FetchSelect
        showSearch
        isPaginated
        label="Select the Company"
        disabled={!props.values.distributor}
        value={get(props.values, 'company', '')}
        onChange={value => props.onChange('company', value)}
        url={`companies`}
        params={props.values.distributor ? {
          distributor: get(props.values, 'distributor', null)
        } : undefined}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
  </Row>
);


DistributorManagerDashboardFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

DistributorManagerDashboardFilter.defaultProps = {
  fetching: false,
  errors: {},
};

export default DistributorManagerDashboardFilter;
