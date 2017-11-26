import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import Select from '../../../core/form/Select';
import FormButtons from '../../../core/form/FormButtons';

const SchoolGradeConfigForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <TextInput
          disabled={props.submitting}
          type="number"
          label="Required hours in week"
          value={get(props.values, 'weeklyHoursRequired', '')}
          onChange={value => props.onChange('weeklyHoursRequired', value)}
          errorText={get(props.errors, 'weeklyHoursRequired', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          disabled={props.submitting}
          type="number"
          label="Maximum Grade"
          value={get(props.values, 'maximumGrade', '')}
          onChange={value => props.onChange('maximumGrade', value)}
          errorText={get(props.errors, 'maximumGrade', null)}
        />
      </Column>
      <Column size={2}>
        <Select
          disabled={props.submitting}
          label="Grade Format"
          value={get(props.values, 'gradeFormat', '')}
          onChange={value => props.onChange('gradeFormat', value)}
          errorText={get(props.errors, 'gradeFormat', '')}
          options={[
            {
              label: '75',
              value: '00',
            },
            {
              label: '7.5',
              value: '0.0',
            },
          ]}
        />
      </Column>
      <Column size={2}>
        <TextInput
          disabled={props.submitting}
          type="number"
          label="Hours percentage"
          value={get(props.values, 'percentHoursRelevanceInGrade', '')}
          onChange={value => props.onChange('percentHoursRelevanceInGrade', value)}
          errorText={get(props.errors, 'percentHoursRelevanceInGrade', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          disabled={props.submitting}
          type="number"
          label="Study Quality percentage"
          value={get(props.values, 'percentStudyQualityRelevanceInGrade', '')}
          onChange={value => props.onChange('percentStudyQualityRelevanceInGrade', value)}
          errorText={get(props.errors, 'percentStudyQualityRelevanceInGrade', null)}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel="Save Grade Configuration"
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

SchoolGradeConfigForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

SchoolGradeConfigForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default SchoolGradeConfigForm;
