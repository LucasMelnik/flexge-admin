import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ContentDetailScene from './ContentDetailScene';
import ContentDetailService from '../../services/ContentDetailService';

class ContentDetailSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      contentId: PropTypes.string.isRequired,
    }).isRequired,
  };

  contentDetailService = new ContentDetailService();
  componentWillMount() {
    this.contentDetailService.handleLoad(this.props.params.contentId);
  }

  render() {
    return (
      <ContentDetailScene
        unit={this.contentDetailService.unit}
        fetching={this.contentDetailService.fetch.fetching}
      />
    );
  }
}

export default observer(ContentDetailSceneContainer);
