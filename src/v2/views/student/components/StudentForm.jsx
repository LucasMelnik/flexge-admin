import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import FormButtons from '../../../core/form/FormButtons';

const StudentForm = props => (
  <Card
    title={props.values.id ? 'Update Student' : 'Create Student'}
    actions={
      (
        <Button
          icon="fa-arrow-left"
          label="Back"
          type="default"
          onClick={() => browserHistory.goBack()}
        />
      )
    }
  >
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column lgSize={3}>
          <TextInput
            disabled={props.submitting}
            label="Student Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            description={get(props.errors, 'name', null)}
            fieldValidation={get(props.errors, 'name', null) && 'error'}
          />
        </Column>
        <Column lgSize={3}>
          <TextInput
            disabled={props.submitting}
            label="Email"
            value={get(props.values, 'email', '')}
            onChange={value => props.onChange('email', value)}
            description={get(props.errors, 'email', null)}
            fieldValidation={get(props.errors, 'email', null) && 'error'}
          />
        </Column>
        <Column lgSize={3}>
          <TextInput
            type="password"
            disabled={props.submitting}
            label="Password"
            value={get(props.values, 'password', '')}
            onChange={value => props.onChange('password', value)}
            description={get(props.errors, 'password', null)}
            fieldValidation={get(props.errors, 'password', null) && 'error'}
          />
        </Column>
      </Row>
      <div style={{ marginBottom: 20 }} />
      <FormButtons
        confirmLabel={props.values.id ? 'Update Student' : 'Create Student'}
        isDisabled={props.submitting || !props.isDirty()}
        onReset={props.onReset}
      />
    </form>
  </Card>
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
  onChange: () => false,
};

export default StudentForm;
