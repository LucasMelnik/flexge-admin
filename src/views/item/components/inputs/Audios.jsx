import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import AudioPreview from '../../../../core/layout/AudioPreview';
import FileInput from '../../../../core/form/FileInput';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';

const Audios = props => (
  <Row>
    {get(props.values, props.generatedAudioPath, null) && (
      <Column size={3}>
        <p>Generated {props.label} audio</p>
        <AudioPreview src={get(props.values, props.generatedAudioPath, '')} />
      </Column>
    )}
    <Column size={8}>
      <FileInput
        label={`Upload an audio to the ${props.label}`}
        accept="audio"
        disabled={props.disabled || props.submitting}
        value={get(props.values, props.audioPath, '')}
        onChange={(key) => props.onChange(props.audioPath, key)}
        errorText={get(props.errors, props.audioPath, '')}
      />
    </Column>
  </Row>
);

Audios.propTypes = {
  audioPath: PropTypes.string.isRequired,
  generatedAudioPath: PropTypes.string.isRequired,
  label: PropTypes.string,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

Audios.defaultProps = {
  label: 'item',
  values: null,
  errors: null,
  submitting: false,
  disabled: false,
};

export default Audios;
