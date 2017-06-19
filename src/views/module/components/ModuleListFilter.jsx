import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';

const ModuleListFilter = props => (
  <div>
    <InlineBlock marginRight={20}>
      <TextInput
        label="Search modules"
        value={props.value}
        onChange={props.onChange}
        disabled={props.fetching}
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

ModuleListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
}

export default ModuleListFilter;
