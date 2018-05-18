import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';

export default class AudioPreview extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  state = { playing: false };

  togglePlay = () => {
    if (!this.state.playing) {
      this.audio.play();
    } else {
      this.audio.pause();
    }

    this.setState({
      playing: !this.state.playing,
    });
  };

  handleAudioEnd = () => {
    this.setState({
      playing: false,
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'inline-block',
        }}
      >
        <Button
          tooltip="Play/Pause"
          onClick={this.togglePlay}
          icon={this.state.playing ? 'pause' : 'caret-right'}
        />
        <audio
          src={`${process.env.REACT_APP_FILES_URL}/${this.props.src}`}
          muted={false}
          controls={false}
          ref={input => { this.audio = input; }}
          preload="auto"
          onEnded={() => this.handleAudioEnd() }
          style={{
            visibility: 'hidden',
            width: 0,
            height: 0,
          }}
        />
      </div>
    );
  }
}