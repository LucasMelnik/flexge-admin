import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import TextEditor from '../../../core/form/TextEditor';
import Column from '../../../core/layout/Column';
import FormButtons from '../../../core/form/FormButtons';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import Switch from '../../../core/form/Switch';
import Separator from '../../../core/layout/Separator';

const MessageForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={6}>
        <Switch
          label="Message to Entire Classrooms ?"
          titleOff="No"
          titleOn="Yes"
          value={get(props.values, 'messageToClassRoom', false)}
          onChange={value => props.onChange('messageToClassRoom', value)}
        />
      </Column>
    </Row>
    <Row>
      {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER' || localStorage.role === 'COMPANY_MANAGER') && (
        <Column size={4}>
          <FetchSelect
            required
            showSearch
            url="schools"
            disabled={props.submitting}
            label="School"
            value={get(props.values, 'school', '')}
            onChange={country => props.onChange('school', country)}
            errorText={get(props.errors, 'school', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
      <Column size={4}>
        <FetchSelect
          required
          multiple={get(props.values, 'messageToClassRoom', false)}
          url={`schools/${get(props.values, 'school', undefined)}/classes`}
          disabled={props.submitting || !get(props.values, 'school', undefined)}
          label="Classroom"
          value={get(props.values, 'schoolClasses', '')}
          onChange={value => props.onChange('schoolClasses', get(props.values, 'messageToClassRoom', false) ? value : [value])}
          errorText={get(props.errors, 'schoolClasses', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      {(!get(props.values, 'messageToClassRoom', false) && get(props.values, 'schoolClasses', false)) && (
        <Column size={4}>
          <FetchSelect
            multiple
            required={!get(props.values, 'messageToClassRoom', false)}
            url={`schools/${get(props.values, 'school', undefined)}/classes/${get(props.values, 'schoolClasses', undefined)}/students`}
            disabled={props.submitting}
            label="Students"
            value={get(props.values, 'students', '')}
            onChange={students => props.onChange('students', students)}
            errorText={get(props.errors, 'students', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
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
