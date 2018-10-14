import React from 'react';
import PropTypes from 'prop-types';
import ContentItem from './ContentItem';
import Carousel from '../../../../core/layout/Carousel';
import Async from '../../../../core/layout/Async';

const ContentItemList = props => (
  <Async fetching={props.fetching}>
    <Carousel>
      {props.items.map(item => (
        <ContentItem
          key={item.id}
          item={item}
        />
      ))}
    </Carousel>
  </Async>
);

ContentItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ContentItemList;
