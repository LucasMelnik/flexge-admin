import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Separator from '../../../core/layout/Separator';
import TextInput from '../../../core/form/TextInput';
import TimeInput from '../../../core/form/TimeInput';
import FormButtons from '../../../core/form/FormButtons';

const MasteryTestForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={4}>
        <TextInput
          step={1}
          type="number"
          max={100}
          disabled={props.submitting}
          label="Module Percentage to Activate"
          value={get(props.values, 'modulePercentageToActive', '')}
          onChange={value => props.onChange('modulePercentageToActive', value)}
          description={get(props.errors, 'modulePercentageToActive', '')}
          fieldValidation={get(props.errors, 'modulePercentageToActive', null) && 'error'}
        />
      </Column>
      {props.values.id && (
        <Column lgSize={4}>
          <TimeInput
            disabled
            label="Deadline Time"
            value={props.deadlineTime}
          />
        </Column>
      )}
      <Column lgSize={4}>
        <TextInput
          label="Score to Pass"
          disabled
          value="85"
        />
      </Column>
    </Row>
    <Separator size="md" />
    <FormButtons
      confirmLabel={props.values.id ? 'Update Mastery Test' : 'Create Mastery Test'}
      isDisabled={props.submitting || !props.isDirty()}
      onReset={props.onReset}
    />
  </form>
);

MasteryTestForm.propTypes = {
  deadlineTime: PropTypes.number.isRequired,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

MasteryTestForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default MasteryTestForm;
