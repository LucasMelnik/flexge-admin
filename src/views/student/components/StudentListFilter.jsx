import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Button from '../../../core/form/Button';
import PermissionValidator from '../../../core/content/PermissionValidator';

const StudentListFilter = props => (
  <Paper>
    <InlineBlock marginRight={20}>
      <TextInput
        label="Search students"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
        disabled={props.fetching}
      />
    </InlineBlock>
    <PermissionValidator allowedFor={['ADMIN']}>
      <InlineBlock marginRight={20}>
        <FetchAutoComplete
          url="/companies"
          disabled={props.fetching}
          label="Company"
          fullWidth={false}
          onSelect={value => props.onChange('company', value)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
          value={get(props.values, 'company.name')}
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

StudentListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

StudentListFilter.defaultProps = {
  fetching: false,
};


export default StudentListFilter;
