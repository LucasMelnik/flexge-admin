import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Select from '../../../core/form/Select';
import FormButtons from '../../../core/form/FormButtons';

const EmailConfigForm = props => (
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
          disabled={props.submitting}
          label="Frequency to send email to parents"
          value={get(props.values, 'emailFrequency', '')}
          onChange={value => props.onChange('emailFrequency', value)}
          errorText={get(props.errors, 'emailFrequency', '')}
          options={[
            {
              label: 'Weekly',
              value: 'WEEKLY',
            },
            {
              label: 'On days 1 and 15 of each month',
              value: 'ON_1_AND_15_DAY',
            },
            {
              label: 'Monthly',
              value: 'MONTHLY',
            },
            {
              label: 'Don\'t send email',
              value: 'NO_EMAIL',
            },
          ]}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel="Save Email Configuration"
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

EmailConfigForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

EmailConfigForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default EmailConfigForm;
