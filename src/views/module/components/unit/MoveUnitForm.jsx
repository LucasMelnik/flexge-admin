import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import FormButtons from '../../../../core/form/FormButtons';
import FetchSelect from '../../../../core/form/FetchSelect';

const MoveUnitForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <FetchSelect
          url="courses"
          disabled={props.submitting}
          label="Course"
          value={get(props.values, 'course', '')}
          onChange={module => props.onChange('course', module)}
          errorText={get(props.errors, 'course', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={4}>
        <FetchSelect
          url={props.values.course ? `modules?query[course]=${props.values.course}` : 'modules'}
          disabled={props.submitting || !props.values.course}
          label="Module"
          value={get(props.values, 'module', '')}
          onChange={module => props.onChange('module', module)}
          errorText={get(props.errors, 'module', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel="Move Unit"
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

MoveUnitForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

MoveUnitForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
  disabled: false,
};

export default MoveUnitForm;
