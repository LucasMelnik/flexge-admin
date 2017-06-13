import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Button from '../../../core/form/Button';

const StudentListFilter = props => (
  <Paper>
    <TextInput
      label="Search students"
      value={props.values.filter}
      onChange={value => props.onChange('filter', value)}
    />
    <InlineBlock width={20} />
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
    <InlineBlock width={20} />
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
