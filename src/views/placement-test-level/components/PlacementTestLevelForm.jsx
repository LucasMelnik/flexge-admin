import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';

const PlacementTestLevelForm = props => (
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
          label="Level"
          type="number"
          value={get(props.values, 'level', '')}
          onChange={value => props.onChange('level', value)}
          errorText={get(props.errors, 'level', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          type="number"
          label="Placement % Error"
          disabled={props.submitting}
          value={get(props.values, 'placementPercentageError', '')}
          onChange={value => props.onChange('placementPercentageError', value)}
          errorText={get(props.errors, 'placementPercentageError', '')}
        />
      </Column>
      <Column size={3}>
        <FetchSelect
          showSearch
          url="courses"
          disabled={props.submitting}
          label="Course"
          value={get(props.values, 'course', '')}
          onChange={course => props.onChange('course', course)}
          errorText={get(props.errors, 'course', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Placement Test Level' : 'Create Placement Test Level'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

PlacementTestLevelForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

PlacementTestLevelForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default PlacementTestLevelForm;
