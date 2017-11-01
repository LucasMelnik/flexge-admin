import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import PermissionValidator from '../../../../core/layout/PermissionValidator';
import FetchSelect from '../../../../core-ant/FetchSelect';

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
        <div
          style={{
            width: 250,
          }}
        >
          Filter by Course
          <FetchSelect
            url="/courses"
            disabled={props.fetching}
            value={get(props.values, 'course')}
            onChange={(value) => {
              props.onChange('course', value);
              props.onSearch();
            }}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </div>
        <div
          style={{
            width: 20,
          }}
        />
        <div
          style={{
            width: 250,
          }}
        >
          Filter by Module
          <FetchSelect
            url={props.values.course && `/modules?query[course]=${get(props.values, 'course', '')}`}
            disabled={props.fetching || !props.values.course}
            value={get(props.values, 'module')}
            onChange={(value) => {
              props.onChange('module', value);
              props.onSearch();
            }}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </div>
        <div
          style={{
            width: 20,
          }}
        />
      </div>
    </PermissionValidator>
    <PermissionValidator allowedFor={['ADMIN']}>
      <ColumnSeparator size="sm" />
    </PermissionValidator>
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
