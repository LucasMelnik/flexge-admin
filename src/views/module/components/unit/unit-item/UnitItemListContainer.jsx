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
    disabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    status: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    isReadOnly: false,
    reviewId: null,
    status: null,
  }

  componentWillMount() {
    UnitItemListService.init(this.props.unitId);
  }

  render() {
    return (
      <UnitItemList
        moduleId={this.props.moduleId}
        unitId={this.props.unitId}
        reviewId={this.props.reviewId}
        status={this.props.status}
        items={toJS(UnitItemListService.items)}
        fetching={UnitItemListService.fetch.fetching}
        onDelete={UnitItemListService.handleUnlinkItem}
        onOrderChange={UnitItemListService.handleOrderChange}
        disabled={this.props.disabled}
        isReadOnly={this.props.isReadOnly}
      />
    );
  }
}

export default observer(UnitItemListContainer);
