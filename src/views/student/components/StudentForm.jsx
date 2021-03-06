import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';
import Select from '../../../core/form/Select';
import DateInput from '../../../core/form/DateInput';
import Switch from '../../../core/form/Switch';
import LocaleSelect from '../../../core/form/LocaleSelect';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const StudentForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={3}>
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
          onChange={value => props.onChange('email', (value || '').toLowerCase())}
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
      <Column size={1}>
        <LocaleSelect
          required
          onChange={value => props.onChange('locale', value)}
          disabled={props.submitting}
          value={get(props.values, 'locale', '')}
          errorText={get(props.errors, 'locale', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={1}>
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
      <Column size={1.5}>
        <DateInput
          disabled={props.submitting}
          label="Birth Date"
          value={get(props.values, 'birthDate', null)}
          onChange={value => props.onChange('birthDate', value)}
          errorText={get(props.errors, 'birthDate', '')}
        />
      </Column>
      <Column size={1.5}>
        <TextInput
          disabled={props.submitting}
          label="Phone"
          value={get(props.values, 'contactPhone', '')}
          onChange={value => props.onChange('contactPhone', value)}
          errorText={get(props.errors, 'contactPhone', null)}
        />
      </Column>
      <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER]}>
        <Column size={1}>
          <Switch
            label="Student Demo"
            titleOff="No"
            titleOn="Yes"
            onChange={value => {
              props.onChange('demoStudent', value);
              if (value && !get(props.values, 'accessStartsAt', false)) {
                props.onChange('accessStartsAt', moment());
              }
              if (value && !get(props.values, 'accessEndsAt', false)) {
                props.onChange('accessEndsAt', moment().add(10, 'days'));
              }
            }}
            value={get(props.values, 'demoStudent', false)}
            disabled={props.submitting}
          />
        </Column>
      </PermissionValidator>
      <Column size={1.5}>
        <DateInput
          disabled={props.submitting}
          required={props.values.demoStudent}
          label="Access Period Start"
          value={get(props.values, 'accessStartsAt', null)}
          onChange={value => props.onChange('accessStartsAt', value)}
          errorText={get(props.errors, 'accessStartsAt', '')}
        />
      </Column>
      <Column size={1.5}>
        <DateInput
          disabled={props.submitting}
          required={props.values.demoStudent}
          label="Access Period End"
          value={get(props.values, 'accessEndsAt', null)}
          onChange={value => props.onChange('accessEndsAt', value)}
          errorText={get(props.errors, 'accessEndsAt', '')}
        />
      </Column>
    </Row>
    <Row>
      {!props.values.currentCourse && (
        <Column size={1.5}>
          <FetchSelect
            url="academic-plans"
            fullWidth
            disabled={props.submitting}
            label="Academic Plan"
            value={get(props.values, 'academicPlan', '')}
            onChange={(value) => {
              props.onChange('academicPlan', value);
              props.onChange('currentCourse', null);
            }}
            errorText={get(props.errors, 'academicPlan', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
      {!props.values.currentCourse && (
        <Column size={1.5}>
          <FetchSelect
            url={`academic-plans/${get(props.values, 'academicPlan', null)}/courses`}
            fullWidth
            disabled={props.submitting || !get(props.values, 'academicPlan', null)}
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
      )}
      {props.values.id && (
        <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER]}>
          <Column size={2.5}>
            <FetchSelect
              showSearch
              isPaginated
              url="schools"
              fullWidth
              required
              disabled={props.submitting}
              label="School"
              value={get(props.values, 'schoolClass.school.id', '')}
              onChange={(schoolId) => {
                props.onChange('schoolClass.school.id', schoolId);
                props.onChange('schoolClass.id', undefined);
              }}
              description={get(props.errors, 'schoolClass.school.id', null)}
              fieldValidation={get(props.errors, 'schoolClass.school.id', null) && 'error'}
              resultTransformer={{
                text: 'name',
                value: 'id',
              }}
            />
          </Column>
        </PermissionValidator>
      )}
      {props.values.id && (
        <Column size={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER].some(r => r === localStorage.role) ? 2 : 4}>
          <FetchSelect
            showSearch
            isPaginated
            params={{
              school: get(props.values, 'schoolClass.school.id', '')
            }}
            url={`schools/${props.values.schoolClass.school.id}/classes`}
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
