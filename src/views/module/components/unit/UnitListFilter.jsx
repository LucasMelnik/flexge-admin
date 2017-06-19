import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import TextInput from '../../../../core/form/TextInput';
import Button from '../../../../core/form/Button';

const UnitListFilter = props => (
  <div>
    <InlineBlock marginRight={20}>
      <TextInput
        label="Search units"
        value={props.values.filter}
        onChange={value => props.onChange('filter', value)}
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
