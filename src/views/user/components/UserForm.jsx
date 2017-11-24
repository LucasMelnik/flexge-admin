import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';

const getRolesByType = (type) => {
  if (type === 'ADMIN') {
    return [
      { value: 'ADMIN', label: 'Admin' },
      { value: 'CONTENT_ADMIN', label: 'Content Admin' },
      { value: 'IMAGE_ADMIN', label: 'Image Admin' },
      { value: 'AUDIO_CONTENT', label: 'Content Audio' },
    ];
  } else if (type === 'DISTRIBUTOR') {
    return [
      { value: 'DISTRIBUTOR_MANAGER', label: 'Distributor Manager' },
    ];
  } else if (type === 'COMPANY') {
    return [
      { value: 'SCHOOL_MANAGER', label: 'School Manager' },
      { value: 'COMPANY_MANAGER', label: 'Company Manager' },
      { value: 'TEACHER', label: 'Teacher' },
    ];
  }
  return [];
};

const UserForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={4}>
        <TextInput
          disabled={props.submitting}
          label="User Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={4}>
        <TextInput
          disabled={props.submitting}
          label="Email"
          value={get(props.values, 'email', '')}
          onChange={value => props.onChange('email', value)}
          errorText={get(props.errors, 'email', null)}
        />
      </Column>
      <Column size={4}>
        <TextInput
          type="password"
          disabled={props.submitting}
          label="Password"
          value={get(props.values, 'password', '')}
          onChange={value => props.onChange('password', value)}
          errorText={get(props.errors, 'password', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={4}>
        <Select
          disabled={props.submitting}
          label="Role"
          value={get(props.values, 'role', '')}
          onChange={value => props.onChange('role', value)}
          errorText={get(props.errors, 'role', '')}
          fieldValidation={get(props.errors, 'role', null) && 'error'}
          options={getRolesByType(props.type)}
        />
      </Column>
      {props.type === 'DISTRIBUTOR' && (
        <Column size={4}>
          <FetchSelect
            url="distributors"
            disabled={localStorage.role !== 'ADMIN' || props.submitting}
            label="Distributor"
            value={get(props.values, 'distributor', '')}
            onChange={school => props.onChange('distributor', school)}
            errorText={get(props.errors, 'distributor', null)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
      {(props.type === 'COMPANY') && (
        <Column size={4}>
          <FetchSelect
            url="companies"
            disabled={localStorage.role === 'COMPANY_MANAGER' || props.submitting}
            label="Company"
            value={get(props.values, 'company', '')}
            onChange={school => props.onChange('company', school)}
            errorText={get(props.errors, 'company', null)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
      {(props.type === 'COMPANY' && get(props.values, 'role', '') === 'SCHOOL_MANAGER') && (
        <Column size={4}>
          <FetchSelect
            url={`schools?query[company]=${get(props.values, 'company', '')}`}
            disabled={props.submitting}
            label="School"
            value={get(props.values, 'school', '')}
            onChange={school => props.onChange('school', school)}
            errorText={get(props.errors, 'school', null)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update User' : 'Create User'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

UserForm.propTypes = {
  type: PropTypes.oneOf(['ADMIN','DISTRIBUTOR', 'COMPANY']).isRequired,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

UserForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default UserForm;
