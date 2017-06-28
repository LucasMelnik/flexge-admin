import React, { Component } from 'react';
import InlineBlock from 'jsxstyle/InlineBlock';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

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
      <InlineBlock>
        <IconButton
          iconClassName="material-icons"
          tooltip="Play/Pause"
          onClick={this.togglePlay}
          style={{
            width: 36,
            height: 36,
            padding: 0,
          }}
        >
          {`${this.state.playing ? 'pause' : 'play'}_circle_outline`}
        </IconButton>
        <audio
          src={this.props.src}
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
      </InlineBlock>
    );
  }
}