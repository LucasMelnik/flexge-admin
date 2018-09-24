import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ContentList from './ContentList';
import ContentListService from '../services/ContentListService';

class ContentListContainer extends Component {
  componentDidMount() {
    ContentListService.init();
  }

  render() {
    return (
      <ContentList
        modules={toJS(ContentListService.contents)}
        fetching={ContentListService.fetch.fetching}
      />
    );
  }
}

export default observer(ContentListContainer);
