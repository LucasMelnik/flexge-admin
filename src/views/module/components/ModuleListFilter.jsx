import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import InlineBlock from 'jsxstyle/InlineBlock';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';

const ModuleListFilter = props => (
  <div>
    <InlineBlock marginRight={20}>
      <TextInput
        label="Search modules"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
        disabled={props.fetching}
      />
    </InlineBlock>
    <InlineBlock marginRight={20}>
      <FetchAutoComplete
        url="/courses"
        disabled={props.fetching}
        label="Course"
        fullWidth={false}
        onSelect={value => props.onChange('course', value)}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
        value={get(props.values, 'course.name')}
      />
    </InlineBlock>
    <Button
      label="Search"
      icon="search"
      priimary
      onClick={props.onSearch}
    />
  </div>
);

ModuleListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

ModuleListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
}

export default ModuleListFilter;
