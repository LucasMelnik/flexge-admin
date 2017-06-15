import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../../core/form/TextInput';

const YoutubeLink = props => (
  <div className="row">
    <div className="col-lg-8">
      <TextInput
        floatingLabel
        fullWidth
        label="Youtube link"
        value={get(props.values, 'link', '')}
        onChange={value => props.onChange('link', value)}
        error={get(props.errors, 'link', '')}
      />
    </div>
    <div className="col-lg-2">
      <TextInput
        floatingLabel
        fullWidth
        label="Start time"
        value={get(props.values, 'startTime', '')}
        onChange={value => props.onChange('startTime', value)}
        error={get(props.errors, 'startTime', '')}
      />
    </div>
    <div className="col-lg-2">
      <TextInput
        floatingLabel
        fullWidth
        label="End time"
        value={get(props.values, 'endTime', '')}
        onChange={value => props.onChange('endTime', value)}
        error={get(props.errors, 'endTime', '')}
      />
    </div>
  </div>
);

YoutubeLink.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

YoutubeLink.defaultProps = {
  values: {},
  errors: {},
  isDirty: () => false,
  onReset: () => false,
  onChange: () => false,
};

export default YoutubeLink;
