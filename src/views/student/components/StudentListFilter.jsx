import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import Button from '../../../core/form/Button';

const StudentListFilter = props => (
  <div
    style={{
      display: 'flex',
    }}
  >
    <div
      style={{
        marginRight: 10,
        width: '20%',
      }}
    >
      <TextInput
        label="Name"
        placeholder="Name student"
        value={get(props.values, 'name', '')}
        onChange={name => props.onChange('name', name)}
        description={get(props.errors, 'name', '')}
        fieldValidation={get(props.errors, 'name', null) && 'error'}
        height={36}
      />
    </div>
    <div
      style={{
        marginRight: 10,
        width: '20%',
      }}
    >
      <TextInput
        label="Email"
        placeholder="Email student"
        value={get(props.values, 'email', '')}
        onChange={email => props.onChange('email', email)}
        height={36}
      />
    </div>
    {!props.hasSchoolClass && (
      <FetchSelect
        url="/schools"
        label="School"
        value={get(props.values, 'school', '')}
        onChange={school => props.onChange('school', school)}
        description={get(props.errors, 'school', '')}
        fieldValidation={get(props.errors, 'school', null) && 'error'}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    )}
    <div
      style={{
        marginLeft: 10,
        marginTop: 33,
      }}
    >
      <Button
        icon="fa-search"
        label="Search"
        type="default"
        onClick={props.onSearch}
      />
    </div>
  </div>
);

StudentListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  hasSchoolClass: PropTypes.bool.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

export default StudentListFilter;
