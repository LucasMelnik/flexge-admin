import React from 'react';
import PropTypes from 'prop-types';
import { Howl } from 'howler';
import AudioPreview from '../../../../core/layout/AudioPreview';
import Row from '../../../../core/layout/Row';
import Button from '../../../../core/form/Button';
import Separator from '../../../../core/layout/Separator';

class NativeSpeechSlice extends React.PureComponent {

  generateSpeechRecognitionSprites = source => source.reduce((acc, wordScore, index) => ({
    ...acc,
    [`sprite_${index}`]: [(wordScore.audioStartTime * 10) - 0.3, ((wordScore.audioEndTime - wordScore.audioStartTime) * 10) + 0.3],
  }), {});

  componentDidMount() {
    this.sound = new Howl({
      src: [`${process.env.REACT_APP_FILES_URL}/${this.props.values.audio}`],
      autoplay: false,
      preload: true,
      loop: false,
      html5: true,
      volume: 1,
      sprite: this.generateSpeechRecognitionSprites(this.props.values.nativeSpeechRecognition.wordScoreList),
    });
  }

  componentWillUnmount() {
    if (this.sound) {
      this.sound.unload();
    }
  }

  togglePlay = (index) => {
    if (!this.sound.playing(`sprite_${index}`)) {
      this.sound.play(`sprite_${index}`);
    }
  };

  render() {
    return (
      <Row>
        {this.props.values.nativeSpeechRecognition && (
          <div
            style={{
              display: 'flex',
            }}
          >
            {this.props.values.nativeSpeechRecognition.wordScoreList.map((item, index) => (
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
                <Button
                  tooltip="Play/Pause"
                  onClick={() => this.togglePlay(index)}
                  icon={'caret-right'}
                />
              </div>
            ))}
          </div>
        )}
        <Separator size="xs"/>
        <Button
          icon="reload"
          disabled={this.props.disabled || this.props.submitting}
          label="Refresh Native Slice"
          onClick={this.props.onRefreshNativeSpeechRecognition}
        />
      </Row>
    );
  }
}

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
