import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ItemFormContainer from '../../item/components/ItemFormContainer';
import UnitItemListService from '../../module/services/UnitItemListService';

class ReviewItemFormContainer extends Component {

  static propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    backToList: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ItemFormContainer
        itemsTypeUrl={`unit-types/${this.props.unit.type.id}/item-types`}
        showPostPhrase={this.props.unit.type.name.toLowerCase() === 'vocabulary'}
        endpointUrl={`units/${this.props.unit.id}/items`}
        order={UnitItemListService.items.length + 1}
        onSaveSuccess={this.props.backToList}
      />
    );
  }
}

export default observer(ReviewItemFormContainer);
