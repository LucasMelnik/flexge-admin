import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import DateInput from '../../../../core/form/DateInput';
import Button from '../../../../core/form/Button';
import Select from '../../../../core/form/Select';

const SchoolEvaluationForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <Select
          required
          label="Period Type"
          disabled={props.submitting}
          value={get(props.values, 'type', null)}
          onChange={(value) => {
            props.onChange('type', value);
            if (get(props.values, 'end', false)) {
              props.onChange('end', undefined);
            }
          }}
          errorText={get(props.errors, 'type', null)}
          options={[
            {
              value: 'RECESS',
              label: 'Recess',
            },
            {
              value: 'EVALUATION',
              label: 'Evaluation',
            },
          ]}
        />
      </Column>
      <Column size={2}>
        <TextInput
          required
          disabled={props.submitting}
          label="Period Name"
          value={get(props.values, 'name', null)}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={2}>
        <DateInput
          required
          disabled={props.submitting}
          label="Start"
          value={get(props.values, 'start', undefined) ? props.values.start.toDate() : undefined}
          onChange={(value) => {
            props.onChange('start', value);
            if (props.values.type && props.values.type === 'EVALUATION') {
              props.onChange('end', value.clone().add(14, 'days'));
            }
          }}
          errorText={get(props.errors, 'start', '')}
        />
      </Column>
      <Column size={2}>
        <DateInput
          required
          disabled={props.submitting || !get(props.values, 'type', null) || !get(props.values, 'start', null)}
          label="End"
          value={get(props.values, 'end', undefined) ? props.values.end.toDate() : undefined}
          onChange={value => props.onChange('end', value)}
          errorText={get(props.errors, 'end', '')}
          disabledDate={(date) => {
            if (!date) {
              return false;
            }
            if (props.values.type && props.values.type === 'EVALUATION') {
              return date.valueOf() < props.values.start.clone().add(14, 'days');
            }
            return date.valueOf() < props.values.start;
          }}
        />
      </Column>
      <Column size={3}>
        <div style={{ height: 30.5 }} />
        <Button
          icon="check"
          type="primary"
          disabled={props.submitting || !props.isDirty()}
          loading={props.submitting}
          buttonType="submit"
          label={props.values.id ? 'Update Evaluation Period' : 'Add Evaluation Period'}
        />
        {' '}
        <Button
          icon="reload"
          type="default"
          disabled={props.submitting}
          onClick={props.onReset}
          buttonType="button"
          label="Cancel"
        />
      </Column>
    </Row>
  </form>
);

SchoolEvaluationForm.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

SchoolEvaluationForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
};

export default SchoolEvaluationForm;
