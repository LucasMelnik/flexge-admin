import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';

const ChangeCourseForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={1.5}>
        <FetchSelect
          url="academic-plans"
          fullWidth
          disabled={true}
          label="Academic Plan"
          value={get(props.values, 'academicPlan', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={1.5}>
        <FetchSelect
          url={`academic-plans/${get(props.values, 'academicPlan', null)}/courses`}
          fullWidth
          disabled={true}
          label="Current course"
          value={get(props.values, 'currentCourse', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={1.5}>
        <FetchSelect
          url={`academic-plans/${get(props.values, 'academicPlan', null)}/courses`}
          fullWidth
          disabled={props.submitting}
          label="New course"
          value={get(props.values, 'newCourse', '')}
          onChange={value => props.onChange('newCourse', value)}
          errorText={get(props.errors, 'newCourse', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Student Course' : 'Not Available'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

ChangeCourseForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

ChangeCourseForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default ChangeCourseForm;
