import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';

const ModuleListFilter = props => (
  <Card
    flexible
  >
    <TextInput
      label="Search modules"
      value={props.value}
      onChange={props.onChange}
    />
  </Card>
);

ModuleListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ModuleListFilter;
