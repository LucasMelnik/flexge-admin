import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const CertificationTestExecutionListFilter = props => (
  <TextInput
    label="Search certification tests"
    placeholder="Start type to filter the certification tests"
    value={props.value}
    onChange={props.onChange}
  />
);

CertificationTestExecutionListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CertificationTestExecutionListFilter;
