import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock'
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import Button from '../../../core/form/Button';
import PermissionValidator from '../../../../core/content/PermissionValidator';

const TeacherListFilter = props => (
  <div>
    <InlineBlock marginRight={20}>
      <TextInput
        label="Search for teachers"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
        disabled={props.fetching}
      />
    </InlineBlock>
    <PermissionValidator allowedFor={['ADMIN']}>
      <InlineBlock marginRight={20}>
        <FetchSelect
          url="/companies"
          disabled={props.fetching}
          label="Company"
          fullWidth={false}
          onChange={value => props.onChange('company', value)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
          value={get(props.values, 'company')}
        />
      </InlineBlock>
    </PermissionValidator>
    <Button
      label="Search"
      icon="search"
      priimary
      onClick={props.onSearch}
    />
  </div>
);

TeacherListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

TeacherListFilter.defaultProps = {
  fetching: false,
};

export default TeacherListFilter;
