import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../../core/form/TextInput';

const SlicesToRemove = props => (
  <div className="row">
    <div className="col-lg-6">
      <TextInput
        floatingLabel
        fullWidth
        label="Text"
        value={get(props.values, 'sliceToRemove', '')}
        onChange={value => props.onChange('sliceToRemove', value)}
        error={get(props.errors, 'sliceToRemove', '')}
      />
    </div>
  </div>
);

SlicesToRemove.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

SlicesToRemove.defaultProps = {
  values: {},
  errors: {},
  isDirty: () => false,
  onReset: () => false,
  onChange: () => false,
};

export default SlicesToRemove;
