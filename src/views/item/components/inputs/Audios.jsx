import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import AudioPreview from '../../../../core/layout/AudioPreview';
import FileInput from '../../../../core/form/FileInput';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';

const Audios = props => (
  <Row>
    {get(props.values, 'generatedAudio', null) && (
      <Column size={3}>
        <p>Generated Audio</p>
        <AudioPreview src={get(props.values, 'generatedAudio', '')} />
      </Column>
    )}
    <Column size={8}>
      <FileInput
        label="Upload an audio to the item"
        accept="audio"
        disabled={props.disabled || props.submitting}
        value={get(props.values, 'audio', '')}
        onChange={(key) => props.onChange('audio', key)}
        errorText={get(props.errors, 'audio', '')}
      />
    </Column>
  </Row>
);

Audios.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

Audios.defaultProps = {
  values: null,
  errors: null,
  submitting: false,
  disabled: false,
};

export default Audios;
