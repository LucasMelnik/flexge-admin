import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Button from '../../../core/form/Button';
import FetchSelect from '../../../core/form/FetchSelect';
import TextInput from '../../../core/form/TextInput';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const DistributorUserListFilter = props => (
  <Row>
    <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT]}>
      <Column size={3}>
        <FetchSelect
          showSearch
          label="Filter by Distributor"
          disabled={props.fetching}
          value={get(props.values, 'distributor', '')}
          onChange={value => props.onChange('distributor', value)}
          url="/distributors"
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </PermissionValidator>
    <Column size={4}>
      <TextInput
        label="Email"
        placeholder="Email student"
        value={get(props.values, 'email', '')}
        onChange={email => props.onChange('email', email)}
        disabled={props.fetching}
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

DistributorUserListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

DistributorUserListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
  errors: {},
};

export default DistributorUserListFilter;
