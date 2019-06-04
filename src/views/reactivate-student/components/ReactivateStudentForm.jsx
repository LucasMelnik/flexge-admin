import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';

const ReactivateStudentForm = props => (
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
          disabled
          label="Student Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={4}>
        <TextInput
          required
          disabled
          label="Email"
          value={get(props.values, 'email', '')}
          onChange={value => props.onChange('email', value)}
          errorText={get(props.errors, 'email', null)}
        />
      </Column>
      {props.values.schoolClass && (
        <Column size={3}>
          <FetchSelect
            showSearch
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
    <FormButtons
      confirmLabel="Reactivate Student"
      isDisabled={props.submitting}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

ReactivateStudentForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

ReactivateStudentForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default ReactivateStudentForm;
