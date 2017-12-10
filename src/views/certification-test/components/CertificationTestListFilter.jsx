import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const CertificationTestListFilter = props => (
  <TextInput
    label="Search certification tests"
    placeholder="Start type to filter the certification tests"
    value={props.value}
    onChange={props.onChange}
  />
);

CertificationTestListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CertificationTestListFilter;
