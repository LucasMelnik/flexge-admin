import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ContentVideoFormScene from './ContentVideoFormScene';

class ContentVideoFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      contentVideoId: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <ContentVideoFormScene
        contentVideoId={this.props.params.contentVideoId}
      />
    );
  }
}

export default observer(ContentVideoFormSceneContainer);
