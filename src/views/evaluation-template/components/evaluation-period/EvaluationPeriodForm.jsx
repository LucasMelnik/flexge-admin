import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import DateInput from '../../../../core/form/DateInput';
import Button from '../../../../core/form/Button';

const SchoolEvaluationForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
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
        <TextInput
          required
          disabled={props.submitting}
          type="number"
          label="Bonus Weeks"
          value={get(props.values, 'bonusWeeks', null)}
          onChange={value => props.onChange('bonusWeeks', value)}
          errorText={get(props.errors, 'bonusWeeks', null)}
        />
      </Column>
      <Column size={2}>
        <DateInput
          required
          disabled={props.submitting || !props.allowSelectStart || get(props.values, 'id', null)}
          label="Start"
          value={get(props.values, 'start', undefined) ? props.values.start.toDate() : undefined}
          onChange={(value) => {
            props.onChange('start', value);
            props.onChange('end', value.clone().days(7));
          }}
          errorText={get(props.errors, 'start', '')}
          disabledDate={date => date && (date.day() !== 1)}
        />
      </Column>
      <Column size={2}>
        <DateInput
          required
          disabled={props.submitting || !get(props.values, 'start', undefined) || get(props.values, 'id', null)}
          label="End"
          value={get(props.values, 'end', undefined) ? props.values.end.toDate() : undefined}
          onChange={value => props.onChange('end', value)}
          errorText={get(props.errors, 'end', '')}
          disabledDate={date => date &&
            (
              date.day() !== 0 ||
              date.valueOf() < props.values.start
            )
          }
        />
      </Column>
      <Column size={2}>
        <div style={{ height: 30.5 }} />
        <Button
          icon="check"
          type="primary"
          disabled={props.submitting || !props.isDirty()}
          loading={props.submitting}
          buttonType="submit"
          label={props.values.id ? 'Update Evaluation Period' : 'Add Evaluation Period'}
        />
      </Column>
    </Row>
  </form>
);

SchoolEvaluationForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
  allowSelectStart: PropTypes.bool.isRequired,
};

SchoolEvaluationForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default SchoolEvaluationForm;
