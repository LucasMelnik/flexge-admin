import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitItemListService from '../../module/services/UnitItemListService';
import ReviewUnitItemImageList from './ReviewUnitItemImageList';

class ReviewUnitItemImageListContainer extends Component {

  static propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    UnitItemListService.init(this.props.unit);
  }

  render() {
    return (
      <ReviewUnitItemImageList
        unit={this.props.unit}
        items={toJS(UnitItemListService.items)}
        fetching={UnitItemListService.fetch.fetching || UnitItemListService.reorderSubmitting}
      />
    );
  }
}

export default observer(ReviewUnitItemImageListContainer);
