import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock'
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Button from '../../../core/form/Button';

const TeacherListFilter = props => (
  <Paper>
    <TextInput
      label="Search for teachers"
      value={props.values.filter}
      onChange={value => props.onChange('filter', value)}
      disabled={props.fetching}
    />
    <InlineBlock width={20} />
    <FetchAutoComplete
      url="/companies"
      disabled={props.fetching}
      errorText={props.error}
      label="Company"
      fullWidth={false}
      onSelect={value => props.onChange('company', value)}
      resultTransformer={{
        text: 'name',
        value: 'id',
      }}
      value={get(props.values, 'company.name')}
    />
    <InlineBlock width={20} />
    <Button
      label="Search"
      icon="search"
      priimary
      onClick={props.onSearch}
    />
  </Paper>
);

TeacherListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  fetching: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

TeacherListFilter.defaultProps = {
  fetching: false,
  error: null,
};

export default TeacherListFilter;
