import React from 'react';
import PropTypes from 'prop-types';
import FetchSelect from '../../../core/form/FetchSelect';

const EmailConfigFilter = props => (
  <FetchSelect
    label="Select the school"
    placeholder="Select the school to config the email frequency"
    value={props.value}
    onChange={props.onChange}
    url={`schools${localStorage.role === 'COMPANY_MANAGER' ? `?company=${JSON.parse(localStorage.getItem('company')).id}` : ''}`}
    resultTransformer={{
      text: 'name',
      value: 'id',
    }}
  />
);

EmailConfigFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EmailConfigFilter;
