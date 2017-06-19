import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import ItemFormService from '../../../../item/services/ItemFormService';
import UnitItemListService from '../../../services/UnitItemListService';
import UnitItemFormService from '../../../services/UnitItemFormService';
import UnitItemList from './UnitItemList';

class UnitItemsContainer extends Component {

  static propTypes = {
    unitId: PropTypes.string.isRequired,
    moduleId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    UnitItemListService.init(this.props.unitId, this.handleSelect);

    const linkUnitCallback = () => {
      UnitItemListService.load();
    };
    UnitItemFormService.init(linkUnitCallback);

    const saveItemCallback = (item, isNew) => {
      if (isNew) {
        const unitItem = {
          unit: this.props.unitId,
          item: item.id,
          order: UnitItemListService.total + 1,
        };
        UnitItemFormService.handleLinkToUnit(unitItem);
      } else {
        UnitItemListService.load();
      }
    };
    ItemFormService.init(saveItemCallback);
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
        onSelect={UnitItemListService.handleSelect}
        onOrderChange={UnitItemListService.handleOrderChange}
      />
    );
  }
}

export default observer(UnitItemsContainer);
