import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import FormButtons from '../../../core/form/FormButtons';
import Switch from '../../../core/form/Switch';
import DateInput from '../../../core/form/DateInput';
import Select from '../../../core/form/Select';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const SchoolClassForm = props => (
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
          label="Class Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={3}>
        <FetchSelect
          required
          showSearch
          url={`/teachers?query[school]=${props.schoolId}`}
          disabled={props.submitting}
          label="Teacher"
          value={get(props.values, 'teacher', '')}
          onChange={teacher => props.onChange('teacher', teacher)}
          errorText={get(props.errors, 'teacher', null)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={3}>
        <DateInput
          disabled={props.submitting}
          label="Start"
          value={get(props.values, 'start', undefined)}
          onChange={value => props.onChange('start', value)}
          errorText={get(props.errors, 'start', null)}
        />
      </Column>
      <Column size={3}>
        <DateInput
          disabled={props.submitting}
          label="End"
          value={get(props.values, 'end', undefined)}
          onChange={value => props.onChange('end', value)}
          errorText={get(props.errors, 'end', null)}
          disabledDate={date => date && props.values.start &&
            (
              date.valueOf() < props.values.start.valueOf()
            )
          }
        />
      </Column>
    </Row>
    <Row>
      <Column size={2}>
        <Select
          required
          disabled={props.submitting}
          label="Required hours in week"
          value={get(props.values, 'weeklyHoursRequired', '')}
          onChange={value => props.onChange('weeklyHoursRequired', value)}
          errorText={get(props.errors, 'weeklyHoursRequired', '')}
          options={[
            {
              label: '1h',
              value: 1,
            },
            {
              label: '1,5h',
              value: 1.5,
            },
            {
              label: '2h',
              value: 2,
            },
            {
              label: '2,5h',
              value: 2.5,
            },
            {
              label: '3h',
              value: 3,
            },
            {
              label: '3,5h',
              value: 3.5,
            },
            {
              label: '4h',
              value: 4,
            },
          ]}
        />
      </Column>
      <Column size={3}>
        <FetchSelect
          required
          url="/academic-plans"
          disabled={props.submitting}
          label="Academic Plan"
          value={get(props.values, 'academicPlan', '')}
          onChange={teacher => props.onChange('academicPlan', teacher)}
          errorText={get(props.errors, 'academicPlan', null)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={3}>
        <FetchSelect
          showSearch
          url={`/evaluation-templates?query[school]=${props.schoolId}`}
          disabled={props.submitting}
          label="Evaluation Template"
          value={get(props.values, 'evaluationTemplate', '')}
          onChange={teacher => props.onChange('evaluationTemplate', teacher)}
          errorText={get(props.errors, 'evaluationTemplate', null)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER]}>
      <Row>
        <Column size={2}>
          <Switch
            label="Is Placement Test Class?"
            titleOff="No"
            titleOn="Yes"
            onChange={value => props.onChange('isPlacementTestClass', value)}
            value={get(props.values, 'isPlacementTestClass', false)}
            disabled={props.submitting}
          />
        </Column>
        <Column size={4}>
          <Switch
            label="Is Intensive Course?"
            titleOff="No"
            titleOn="Yes"
            onChange={value => props.onChange('isIntensiveCourse', value)}
            value={get(props.values, 'isIntensiveCourse', false)}
            disabled={props.submitting}
          />
        </Column>
      </Row>
    </PermissionValidator>
    <FormButtons
      confirmLabel={props.values.id ? 'Update School Class' : 'Create School Class'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

SchoolClassForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
  schoolId: PropTypes.string.isRequired,
};

SchoolClassForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default SchoolClassForm;
