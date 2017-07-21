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
    }).isRequired,
  };

  componentWillMount() {
    UnitItemListService.init(this.props.unit.id);
  }

  render() {
    return (
      <UnitItemList
        unit={this.props.unit}
        items={toJS(UnitItemListService.items)}
        fetching={UnitItemListService.fetch.fetching}
        onDelete={UnitItemListService.handleUnlinkItem}
        onOrderOrGroupChange={UnitItemListService.handleOrderOrGroupChange}
      />
    );
  }
}

export default observer(UnitItemListContainer);
