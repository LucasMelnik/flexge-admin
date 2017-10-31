import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import Button from '../../../../core/form/Button';
import FetchSelect from '../../../../core/form/FetchSelect';
import PermissionValidator from '../../../../core/layout/PermissionValidator';

const UnitItemErrorListFilter = props => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
    }}
  >
    <PermissionValidator allowedFor={['ADMIN']}>
      <div
        style={{
          display: 'flex',
          zIndex: 3,
        }}
      >
        <FetchSelect
          url="/courses"
          label="Course"
          disabled={props.fetching}
          value={get(props.values, 'course')}
          onChange={value => props.onChange('course', value)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
        <div
          style={{
            width: 20,
          }}
        />
        <FetchSelect
          url={props.values.course && `/modules?query[course]=${get(props.values, 'course', '')}`}
          label="Module"
          disabled={props.fetching}
          value={get(props.values, 'module')}
          onChange={value => props.onChange('module', value)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
        <div
          style={{
            width: 20,
          }}
        />
        <FetchSelect
          url={props.values.module && `/modules/${get(props.values, 'module', '')}/units`}
          label="Unit"
          disabled={props.fetching}
          value={get(props.values, 'unit')}
          onChange={value => props.onChange('unit', value)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </div>
    </PermissionValidator>
    <PermissionValidator allowedFor={['ADMIN']}>
      <ColumnSeparator size="sm" />
    </PermissionValidator>
    <Button
      label="Search"
      icon="fa-search"
      onClick={props.onSearch}
    />
  </div>
);

UnitItemErrorListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

UnitItemErrorListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
}

export default UnitItemErrorListFilter;
