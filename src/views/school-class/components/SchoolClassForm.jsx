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
    {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER') && (
      <Row>
        <Column size={4}>
          <Switch
            label="Is Placement Test Class?"
            titleOff="False"
            titleOn="True"
            onChange={value => props.onChange('isPlacementTestClass', value)}
            value={get(props.values, 'isPlacementTestClass', false)}
            disabled={props.submitting}
          />
        </Column>
      </Row>
    )}
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
