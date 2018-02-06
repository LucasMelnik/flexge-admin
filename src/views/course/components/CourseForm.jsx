import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Switch from '../../../core/form/Switch';

const CourseForm = props => (
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
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={3}>
        <Switch
          label="Does the course need a Certification Test?"
          titleOff="No"
          titleOn="Yes"
          value={get(props.values, 'needCertification', false)}
          onChange={value => props.onChange('needCertification', value)}
          errorText={get(props.errors, 'needCertification', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextInput
          required
          disabled={props.submitting}
          label="Description"
          value={get(props.values, 'description', '')}
          onChange={value => props.onChange('description', value)}
          errorText={get(props.errors, 'description', null)}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Course' : 'Create Course'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

CourseForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

CourseForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default CourseForm;
