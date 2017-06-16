import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Button from '../../../core/form/Button';
import PermissionValidator from '../../../core/content/PermissionValidator';

const UnitListFilter = props => (
  <Paper>
    <InlineBlock marginRight={20}>
      <TextInput
        label="Search units"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
        disabled={props.fetching}
      />
    </InlineBlock>
    <PermissionValidator allowedFor={['ADMIN']}>
      <InlineBlock marginRight={20}>
        <FetchAutoComplete
          url="/modules"
          disabled={props.fetching}
          label="Module"
          fullWidth={false}
          onSelect={value => props.onChange('module', value)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
          value={get(props.values, 'module.name')}
        />
      </InlineBlock>
    </PermissionValidator>
    <Button
      label="Search"
      icon="search"
      priimary
      onClick={props.onSearch}
    />
  </Paper>
);

UnitListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

UnitListFilter.defaultProps = {
  fetching: false,
};


export default UnitListFilter;
