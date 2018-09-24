import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ContentItemListService from '../../services/ContentItemListService';
import ContentItemList from './ContentItemList';

class ContentItemListContainer extends Component {
  static propTypes = {
    contentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    ContentItemListService.init(this.props.contentId);
  }

  render() {
    return (
      <ContentItemList
        items={toJS(ContentItemListService.items)}
        fetching={ContentItemListService.fetch.fetching}
      />
    );
  }
}

export default observer(ContentItemListContainer);
