import React from 'react';
import PropTypes from 'prop-types';
import AudioPreview from '../../../../core/layout/AudioPreview';
import Row from '../../../../core/layout/Row';
import Button from '../../../../core/form/Button';
import Separator from '../../../../core/layout/Separator';

const NativeSpeechSlice = props => props.values.nativeSpeechRecognition ? (
  <Row>
    <div
      style={{
        display: 'flex',
      }}
    >
      {props.values.nativeSpeechRecognition.wordScoreList.map(item => (
        <div
          key={item.audioStartTime}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0px 10px 0px 0px'
          }}
        >
          <small>{item.word}</small>
          <AudioPreview src={`${props.values.audio}#t=${(item.audioStartTime / 100)},${item.audioEndTime / 100 - 0.05}`} />
        </div>
      ))}
    </div>
    <Separator size="xs"/>
    <Button
      icon="reload"
      disabled={props.disabled || props.submitting}
      label="Refresh Native Slice"
      onClick={props.onRefreshNativeSpeechRecognition}
    />
  </Row>
) : null;

NativeSpeechSlice.propTypes = {
  onRefreshNativeSpeechRecognition: PropTypes.func.isRequired,
  values: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

NativeSpeechSlice.defaultProps = {
  values: null,
  submitting: false,
  disabled: false,
};

export default NativeSpeechSlice;
