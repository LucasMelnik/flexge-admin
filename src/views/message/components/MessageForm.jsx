import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import TextEditor from '../../../core/form/TextEditor';
import Column from '../../../core/layout/Column';
import FormButtons from '../../../core/form/FormButtons';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import Separator from '../../../core/layout/Separator';
import Select from '../../../core/form/Select';
import StudentAutoCompleteContainer from '../../../core/form/StudentAutoCompleteContainer';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import { Roles } from '../../../core/util';

const MessageForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={3}>
        <Select
          label="What is the type of the message"
          required
          disabled={props.submitting}
          value={get(props.values, 'type', false)}
          onChange={value => {
            props.onChange('type', value);
            props.onChange('school', ([Roles.SCHOOL_MANAGER, Roles.TEACHER].some(r => r === localStorage.role)) ? localStorage.getItem('school') : null);
            props.onChange('schoolClasses', null);
            props.onChange('students', null);
          }}
          errorText={get(props.errors, 'type', '')}
          options={['To one student', 'To students', 'To Classroom'].map(label => ({
            label: label,
            value: label.toUpperCase().replace(/ /g, '_'),
          }))}
        />
      </Column>
    </Row>
    <Row>
      {get(props.values, 'type', '') !== 'TO_ONE_STUDENT' && (
        <div>
          <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER]}>
            <Column size={4}>
              <FetchSelect
                required
                showSearch
                isPaginated
                url="schools"
                disabled={props.submitting}
                label="School"
                value={get(props.values, 'school', '')}
                onChange={school => {
                  props.onChange('school', school);
                  props.onChange('schoolClasses', undefined);
                  props.onChange('students', undefined);
                }}
                errorText={get(props.errors, 'school', '')}
                resultTransformer={{
                  text: 'name',
                  value: 'id',
                }}
              />
            </Column>
          </PermissionValidator>
          <Column size={4}>
            <FetchSelect
              required
              isPaginated
              showSearch
              multiple={get(props.values, 'messageType', '') === 'group_of_students'}
              url={`schools/${get(props.values, 'school', undefined)}/classes`}
              disabled={props.submitting || !get(props.values, 'school', undefined)}
              label="Classroom"
              value={get(props.values, 'schoolClasses', '')}
              onChange={value => {
                (props.onChange('schoolClasses', get(props.values, 'messageType', '') === 'to_classroom' ? value : [value]));
                props.onChange('students', undefined);
              }}
              errorText={get(props.errors, 'schoolClasses', '')}
              resultTransformer={{
                text: 'name',
                value: 'id',
              }}
            />
          </Column>
          {get(props.values, 'type', '') === 'TO_STUDENTS' && (
            <Column size={4}>
              <FetchSelect
                multiple
                required
                url={`schools/${get(props.values, 'school', undefined)}/classes/${get(props.values, 'schoolClasses', undefined)}/students`}
                disabled={props.submitting || !get(props.values, 'school', undefined) || !get(props.values, 'schoolClasses', undefined)}
                label="Students"
                value={get(props.values, 'students', '')}
                onChange={students => props.onChange('students', students)}
                errorText={get(props.errors, 'students', '')}
                resultTransformer={{
                  text: 'name',
                  textFunc: item => `${item.name} - ${item.email}`,
                  value: 'id',
                }}
              />
            </Column>
          )}
        </div>
      )}
      {get(props.values, 'type', '') === 'TO_ONE_STUDENT' && (
        <Column size={4}>
          <StudentAutoCompleteContainer
            disabled={props.submitting}
            value={get(props.values, 'student', '')}
            onSelect={(student, fullObject) => {
              props.onChange('student', student);
              props.onChange('school', fullObject.schoolClass.school.id);
              props.onChange('schoolClasses', [fullObject.schoolClass.id]);
              props.onChange('students', [student]);
            }}
            onChange={value => {
              props.onChange('studentId', undefined);
              props.onChange('students', undefined);
              props.onChange('school', ([Roles.SCHOOL_MANAGER, Roles.TEACHER].some(r => r === localStorage.role)) ? localStorage.getItem('school') : null);
              props.onChange('schoolClasses', undefined);
              props.onChange('student', value);
            }}
          />
        </Column>
      )}
    </Row>
    <Row>
      <Column size={6}>
        <TextInput
          required
          disabled={props.submitting}
          label="Subject"
          value={get(props.values, 'subject', '')}
          onChange={value => props.onChange('subject', value)}
          errorText={get(props.errors, 'subject', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextEditor
          placeholder="Write your message..."
          isRequired
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          options={{
            toolbar: [
              ['bold', 'italic', 'underline'],
            ],
          }}
        />
      </Column>
    </Row>
    <Separator />
    <FormButtons
      confirmLabel={props.values.id ? 'Update Message' : 'Send Message'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

MessageForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

MessageForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default MessageForm;
