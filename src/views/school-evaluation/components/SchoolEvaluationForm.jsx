import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import DateInput from '../../../core/form/DateInput';
import FormButtons from '../../../core/form/FormButtons';

const SchoolEvaluationForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={3}>
        <TextInput
          disabled={props.submitting}
          label="Period Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          disabled={props.submitting}
          type="number"
          label="Bonus Weeks"
          value={get(props.values, 'bonusWeeks', '')}
          onChange={value => props.onChange('bonusWeeks', value)}
          errorText={get(props.errors, 'bonusWeeks', null)}
        />
      </Column>
      <Column size={2}>
        <DateInput
          disabled={props.submitting}
          label="Start"
          value={get(props.values, 'start', undefined) ? props.values.start.toDate() : undefined}
          onChange={value => props.onChange('start', value)}
          errorText={get(props.errors, 'start', '')}
          disabledDate={date => date && (date.day() !== 1 || date.year() !== props.selectedYear)}
        />
      </Column>
      <Column size={2}>
        <DateInput
          disabled={props.submitting || !get(props.values, 'start', undefined)}
          label="End"
          value={get(props.values, 'end', undefined) ? props.values.end.toDate() : undefined}
          onChange={value => props.onChange('end', value)}
          errorText={get(props.errors, 'end', '')}
          disabledDate={date => date &&
            (
              date.day() !== 0 ||
              date.valueOf() < props.values.start ||
              date.year() !== props.selectedYear
            )
          }
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Evaluation Period' : 'Add Evaluation Period'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
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
  selectedYear: PropTypes.number.isRequired
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
