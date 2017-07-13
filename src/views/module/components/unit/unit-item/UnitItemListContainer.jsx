import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitItemListService from '../../../services/UnitItemListService';
import UnitItemList from './UnitItemList';

class UnitItemListContainer extends Component {

  static propTypes = {
    unitId: PropTypes.string.isRequired,
    moduleId: PropTypes.string.isRequired,
    reviewId: PropTypes.string,
    isReadOnly: PropTypes.bool,
    status: PropTypes.string,
  };

  static defaultProps = {
    isReadOnly: false,
    reviewId: null,
    status: null,
  }

  unitItemListService = new UnitItemListService();

  componentWillMount() {
    this.unitItemListService.init(this.props.unitId);
  }

  render() {
    return (
      <UnitItemList
        moduleId={this.props.moduleId}
        unitId={this.props.unitId}
        reviewId={this.props.reviewId}
        status={this.props.status}
        items={toJS(this.unitItemListService.items)}
        fetching={this.unitItemListService.fetch.fetching}
        onDelete={this.unitItemListService.handleUnlinkItem}
        onOrderChange={this.unitItemListService.handleOrderChange}
        isReadOnly={this.props.isReadOnly}
      />
    );
  }
}

export default observer(UnitItemListContainer);
