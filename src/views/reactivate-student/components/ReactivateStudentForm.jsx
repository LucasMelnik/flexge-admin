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
      <Column size={3}>
        <FetchSelect
          showSearch
          isPaginated
          url={`/schools/${props.schoolId}/classes`}
          fullWidth
          disabled={props.submitting}
          label="School Class"
          value={get(props.values, 'schoolClass.id', '')}
          onChange={(schoolClassId) => {
            if (schoolClassId) {
              props.onChange('schoolClass.id', schoolClassId);
            } else {
              props.onChange('schoolClass', null);
            }
          }}
          errorText={get(props.errors, 'schoolClass', null)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
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
  schoolId: PropTypes.string.isRequired,
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
