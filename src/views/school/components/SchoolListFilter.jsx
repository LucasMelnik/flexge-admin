import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';

const SchoolListFilter = props => (
  <Card>
    <TextInput
      label="Search schools"
      value={props.value}
      onChange={props.onChange}
    />
  </Card>
);

SchoolListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SchoolListFilter;
