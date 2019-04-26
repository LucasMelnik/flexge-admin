import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from '@vimeo/player';
import moment from 'moment';

export default class VideoPreview extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    videoStartTime: PropTypes.string,
    videoEndTime: PropTypes.string,
  };

  componentDidMount() {
    setTimeout(async () => {
      const player = new Player(this.props.id, {
        url: this.props.src,
      });

      if (this.props.videoStartTime && this.props.videoEndTime) {
        const fixedStart = this.props.videoStartTime.match(/.{2}/g)
          .reduce((acc, value, index) => acc.concat(index ? ':' : '').concat(value), '');
        const fixedEnd = this.props.videoEndTime.match(/.{2}/g)
          .reduce((acc, value, index) => acc.concat(index ? ':' : '').concat(value), '');

        const startSeconds = moment.duration(fixedStart).asSeconds();
        const endSeconds = moment.duration(fixedEnd).asSeconds();

        await player.addCuePoint(endSeconds);
        player.setCurrentTime(startSeconds);

        player.on('cuepoint', (data) => {
          player.setCurrentTime(startSeconds);
          player.pause();
        });
      }
    }, 0);
  }


  render() {
    return (
      <div
        id={this.props.id}
        style={{
          textAlign: 'center',
          marginBottom: 20,
        }}
      />
    );
  }
}