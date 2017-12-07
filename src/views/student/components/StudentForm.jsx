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
          disabled={props.submitting}
          label="Student Name"
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
      <Column size={3}>
        {props.values.id && (
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
        )}
      </Column>
    </Row>
    <Row>
      <Column size={3}>
        <TextInput
          disabled={props.submitting}
          label="Father Name"
          type="text"
          value={get(props.values, 'fatherName', '')}
          onChange={value => props.onChange('fatherName', value)}
          errorText={get(props.errors, 'fatherName', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          disabled={props.submitting}
          label="Father Email"
          type="text"
          value={get(props.values, 'fatherEmail', '')}
          onChange={value => props.onChange('fatherEmail', value)}
          errorText={get(props.errors, 'fatherEmail', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          disabled={props.submitting}
          label="Mother Name"
          type="text"
          value={get(props.values, 'motherName', '')}
          onChange={value => props.onChange('motherName', value)}
          errorText={get(props.errors, 'motherName', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          disabled={props.submitting}
          label="Mother Email"
          type="text"
          value={get(props.values, 'motherEmail', '')}
          onChange={value => props.onChange('motherEmail', value)}
          errorText={get(props.errors, 'motherEmail', null)}
        />
      </Column>
    </Row>
    {!props.values.id && (
      <Switch
        label="Welcome Email"
        titleOff="Don't send"
        titleOn="Send"
        onChange={value => props.onChange('sendWelcomeEmail', value)}
        value={get(props.values, 'sendWelcomeEmail', false)}
        disabled={props.submitting}
      />
    )}
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
