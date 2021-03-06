import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FetchSelect from '../../../core/form/FetchSelect';
import MonthInput from '../../../core/form/MonthInput';
import Button from '../../../core/form/Button';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const StudentAchievementsListFilter = props => (
  <Row>
    <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER]}>
      <Column size={3}>
        <FetchSelect
          showSearch
          isPaginated
          label="Filter by School"
          disabled={props.fetching}
          value={get(props.values, 'school', '')}
          errorText={get(props.errors, 'school', '')}
          onChange={value => props.onChange('school', value)}
          url={`schools${
            localStorage.role === Roles.DISTRIBUTOR_MANAGER
              ? `?distributor=${localStorage.getItem('distributor')}`
              : localStorage.role === Roles.COMPANY_MANAGER
                ? `?company=${localStorage.getItem('company')}`
                : ''
          }`}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </PermissionValidator>
    <Column size={2.5}>
      <FetchSelect
        showSearch
        label="Filter by Type"
        disabled={props.fetching}
        value={get(props.values, 'type', '')}
        errorText={get(props.errors, 'type', '')}
        onChange={value => props.onChange('type', value)}
        url="achievements"
        resultTransformer={{
          text: 'description',
          value: 'id',
        }}
      />
    </Column>
    <Column size={1.5}>
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
      <Button label="Search" icon="search" onClick={props.onSearch} />
    </Column>
  </Row>
);

StudentAchievementsListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
  errors: PropTypes.object,
};

StudentAchievementsListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
  errors: {},
};

export default StudentAchievementsListFilter;
