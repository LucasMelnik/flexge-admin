import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import Button from '../../../../core/form/Button';
import FetchSelect from '../../../../core/form/FetchSelect';
import PermissionValidator from '../../../../core/layout/PermissionValidator';

const UnitImageListFilter = props => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
    }}
  >
    <PermissionValidator allowedFor={['ADMIN']}>
      <div
        style={{
          zIndex: 3,
        }}
      >
        <FetchSelect
          url="/users?query[role]=IMAGE_ADMIN"
          label="Unit Image Owner"
          disabled={props.fetching}
          value={get(props.values, 'imageOwner')}
          onChange={value => props.onChange('imageOwner', value)}
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

UnitImageListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

UnitImageListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
}

export default UnitImageListFilter;
