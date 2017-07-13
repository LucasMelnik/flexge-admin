import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitItemListService from '../../../services/UnitItemListService';
import UnitItemList from './UnitItemList';

class UnitItemListContainer extends Component {

  static propTypes = {
    unitId: PropTypes.string.isRequired,
    status: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isReadOnly: false,
    status: null,
  }

  componentWillMount() {
    UnitItemListService.init(this.props.unitId);
  }

  render() {
    return (
      <UnitItemList
        status={this.props.status}
        items={toJS(UnitItemListService.items)}
        fetching={UnitItemListService.fetch.fetching}
        onDelete={UnitItemListService.handleUnlinkItem}
        onOrderChange={UnitItemListService.handleOrderChange}
        onSelect={this.props.onSelect}
      />
    );
  }
}

export default observer(UnitItemListContainer);
