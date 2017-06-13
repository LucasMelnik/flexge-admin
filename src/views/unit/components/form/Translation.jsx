import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../../core/form/TextInput';

const Translation = props => (
  <div className="row">
    <div className="col-lg-6">
      <TextInput
        floatingLabel
        fullWidth
        label="Text"
        value={get(props.values, 'text', '')}
        onChange={value => props.onChange('text', value)}
        error={get(props.errors, 'text', '')}
      />
    </div>
    <div className="col-lg-6">
      <TextInput
        floatingLabel
        fullWidth
        label="Translation"
        value={get(props.values, 'translation', '')}
        onChange={value => props.onChange('translation', value)}
        error={get(props.errors, 'translation', '')}
      />
    </div>
  </div>
);

Translation.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

Translation.defaultProps = {
  values: {},
  errors: {},
  isDirty: () => false,
  onReset: () => false,
  onChange: () => false,
};

export default Translation;
