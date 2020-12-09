import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ContentVideoList from './ContentVideoList';
import ContentVideoListService from '../services/ContentVideoListService';

class ContentVideoListContainer extends Component {

  componentDidMount() {
    ContentVideoListService.init();
  }

  render() {
    return (
      <ContentVideoList
        contentVideos={toJS(ContentVideoListService.contentVideos)}
        fetching={ContentVideoListService.fetch.fetching}
        onDelete={ContentVideoListService.handleRemove}
        onReview={ContentVideoListService.handleReview}
      />
    );
  }
}

export default observer(ContentVideoListContainer);
