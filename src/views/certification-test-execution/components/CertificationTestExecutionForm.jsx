import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import FileInput from '../../../core/form/FileInput';

const CertificationTestExecutionForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <TextInput
          disabled={props.submitting}
          label="Student name"
          value={get(props.values, 'student.name', '')}
          onChange={value => props.onChange('student.name', value)}
          errorText={get(props.errors, 'student.name', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          disabled
          label="Schedule At"
          value={moment(props.values.scheduledAt).format('DD/MM/YYYY HH:mm')}
        />
      </Column>
      <Column size={2}>
        <TextInput
          disabled
          label="Schedule For"
          value={moment(props.values.scheduledFor).format('DD/MM/YYYY HH:mm')}
        />
      </Column>
    </Row>
    <Row>
      <Column size={4}>
        <FileInput
          label="Upload a student document"
          accept="image"
          disabled={props.submitting}
          value={get(props.values, 'document', '')}
          onChange={key => props.onChange('document', key)}
          errorText={get(props.errors, 'document', '')}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel="Update Certification Test"
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

CertificationTestExecutionForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

CertificationTestExecutionForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default CertificationTestExecutionForm;
