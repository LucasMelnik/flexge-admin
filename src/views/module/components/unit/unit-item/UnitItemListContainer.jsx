import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import UnitItemListService from '../../../services/UnitItemListService';
import UnitItemList from './UnitItemList';

class UnitItemListContainer extends Component {

  static propTypes = {
    unitId: PropTypes.string.isRequired,
    moduleId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    UnitItemListService.init(this.props.unitId);
  }

  handleSelect = (unitItem) => {
    browserHistory.push(`/modules/${this.props.moduleId}/units/${this.props.unitId}/items/${unitItem.item.id}`)
  };

  render() {
    return (
      <UnitItemList
        items={toJS(UnitItemListService.items)}
        fetching={UnitItemListService.fetch.fetching}
        onDelete={UnitItemListService.handleUnlinkItem}
        onSelect={this.handleSelect}
        onOrderChange={UnitItemListService.handleOrderChange}
      />
    );
  }
}

export default observer(UnitItemListContainer);
