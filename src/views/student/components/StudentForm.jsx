import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';
import Select from '../../../core/form/Select';
import DateInput from '../../../core/form/DateInput';
import Switch from '../../../core/form/Switch';

const StudentForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={4}>
        <TextInput
          required
          disabled={props.submitting}
          label="Student Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          disabled={props.submitting}
          label="ID"
          value={get(props.values, 'cpf', '')}
          onChange={value => props.onChange('cpf', value)}
          errorText={get(props.errors, 'cpf', '')}
        />
      </Column>
      <Column size={4}>
        <TextInput
          required
          disabled={props.submitting}
          label="Email"
          value={get(props.values, 'email', '')}
          onChange={value => props.onChange('email', value)}
          errorText={get(props.errors, 'email', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          required={!props.values.id}
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
      <Column size={3}>
        <Select
          label="Gender"
          disabled={props.submitting}
          value={get(props.values, 'gender', '')}
          onChange={value => props.onChange('gender', value)}
          errorText={get(props.errors, 'gender', null)}
          options={[{label: 'Male', value: 'M'}, {label: 'Female', value: 'F'}].map(gender => ({
            label: gender.label,
            value: gender.value,
          }))}
        />
      </Column>
      <Column size={3}>
        <DateInput
          disabled={props.submitting}
          label="Birth Date"
          value={get(props.values, 'birthDate', null)}
          onChange={value => props.onChange('birthDate', value)}
          errorText={get(props.errors, 'birthDate', '')}
        />
      </Column>
      <Column size={3}>
        <FetchSelect
          url="courses"
          fullWidth
          disabled={props.submitting || (props.values.id && props.values.currentCourse)}
          label="Current course"
          value={get(props.values, 'currentCourse', '')}
          onChange={value => props.onChange('currentCourse', value)}
          errorText={get(props.errors, 'currentCourse', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      {props.values.id && (
        <Column size={3}>
          <FetchSelect
            url={`/schools/${props.values.schoolClass.school.id}/classes`}
            fullWidth
            disabled={props.submitting}
            label="School Class"
            value={get(props.values, 'schoolClass.id', '')}
            onChange={(schoolClassId) => {
              props.onChange('schoolClass.id', schoolClassId);
            }}
            description={get(props.errors, 'schoolClass', null)}
            fieldValidation={get(props.errors, 'schoolClass', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
    </Row>
    <Row>
      {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER') && (
        <Column size={2}>
          <Switch
            label="Student Demo"
            titleOff="No"
            titleOn="Yes"
            onChange={value => props.onChange('demoStudent', value)}
            value={get(props.values, 'demoStudent', false)}
            disabled={props.submitting}
          />
        </Column>
      )}
      {!props.values.id && (
        <Column size={2}>
          <Switch
            label="Welcome Email"
            titleOff="Don't send"
            titleOn="Send"
            onChange={value => props.onChange('sendWelcomeEmail', value)}
            value={get(props.values, 'sendWelcomeEmail', false)}
            disabled={props.submitting}
          />
        </Column>
      )}
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Student' : 'Create Student'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

StudentForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

StudentForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default StudentForm;
