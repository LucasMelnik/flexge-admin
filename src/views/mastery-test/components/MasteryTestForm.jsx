import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';
import TextInput from '../../../core/form/TextInput';
import MaskInput from '../../../core/form/MaskInput';

const MasteryTestForm = props => (
  <Paper>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column lgSize={4}>
          <MaskInput
            maskType="custom"
            numeralPositiveOnly
            blocks={[2]}
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Module Percentage to Activate"
            value={get(props.values, 'modulePercentageToActive', '')}
            onChange={value => props.onChange('modulePercentageToActive', value)}
            errorText={get(props.errors, 'modulePercentageToActive', '')}
          />
        </Column>
        {props.values.id && (
          <Column lgSize={4}>
            <TextInput
              floatingLabel
              fullWidth
              disabled
              label="Deadline Time"
              value={props.deadlineTime}
            />
          </Column>
        )}
        <Column lgSize={4}>
          <TextInput
            floatingLabel
            fullWidth
            label="Score to Pass"
            disabled
            value={85}
            errorText={get(props.errors, 'scoreToPass', '')}
          />
        </Column>
      </Row>
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update' : 'Create'}
      />
      <Separator size="xs" />
      <Button
        icon="clear"
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        onClick={props.onReset}
        label="Discard changes"
      />
    </form>
  </Paper>
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
