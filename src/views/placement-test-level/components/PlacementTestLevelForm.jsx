import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Async from '../../../core/layout/Async';
import FetchSelect from '../../../core/form/FetchSelect';

const PlacementTestLevelForm = props => (
  <Async fetching={props.submitting}>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column lgSize={3}>
          <TextInput
            disabled={props.submitting}
            label="Level"
            type="number"
            value={get(props.values, 'level', '')}
            onChange={value => props.onChange('level', value)}
            description={get(props.errors, 'level', null)}
            fieldValidation={get(props.errors, 'level', null) && 'error'}
          />
        </Column>
        <Column lgSize={3}>
          <TextInput
            type="number"
            label="Placement % Error"
            disabled={props.submitting}
            value={get(props.values, 'placementPercentageError', '')}
            onChange={value => props.onChange('placementPercentageError', value)}
            description={get(props.errors, 'placementPercentageError', '')}
            fieldValidation={get(props.errors, 'placementPercentageError', null) && 'error'}
          />
        </Column>
        <Column lgSize={3}>
          <FetchSelect
            url="courses"
            disabled={props.submitting}
            label="Course"
            value={get(props.values, 'course', '')}
            onChange={course => props.onChange('course', course)}
            description={get(props.errors, 'course', '')}
            fieldValidation={get(props.errors, 'course', null) && 'error'}
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
        onReset={props.onReset}
      />
    </form>
  </Async>
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
  onChange: () => false,
  onReset: () => false,
};

export default PlacementTestLevelForm;
