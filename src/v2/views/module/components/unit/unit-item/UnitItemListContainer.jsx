import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitItemListService from '../../../services/UnitItemListService';
import UnitItemList from './UnitItemList';

class UnitItemListContainer extends Component {

  static propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
    }).isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  componentWillMount() {
    UnitItemListService.init(this.props.unit.id);
  }

  render() {
    return (
      <UnitItemList
        unit={this.props.unit}
        items={toJS(UnitItemListService.items)}
        submitting={UnitItemListService.submit.fetching}
        fetching={UnitItemListService.fetch.fetching || UnitItemListService.reorderSubmitting}
        onDelete={UnitItemListService.handleUnlinkItem}
        onOrderOrGroupChange={UnitItemListService.handleOrderOrGroupChange}
        onAutoReorder={UnitItemListService.handleAutoReorder}
        disabled={this.props.disabled}
      />
    );
  }
}

export default observer(UnitItemListContainer);
