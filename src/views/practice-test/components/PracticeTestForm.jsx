import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Separator from '../../../core/layout/Separator';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';

const PracticeTestForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={4}>
        <TextInput
          disabled={props.submitting}
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          description={get(props.errors, 'name', '')}
          fieldValidation={get(props.errors, 'name', null) && 'error'}
        />
      </Column>
    </Row>
    <Separator size="md" />
    <FormButtons
      confirmLabel={props.values.id ? 'Update Practice Test' : 'Create Practice Test'}
      isDisabled={props.submitting || !props.isDirty()}
      onReset={props.onReset}
    />
  </form>
);

PracticeTestForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

PracticeTestForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default PracticeTestForm;
