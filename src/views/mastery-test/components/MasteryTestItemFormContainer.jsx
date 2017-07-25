import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MasteryTestListItemsService from '../services/MasteryTestListItemsService';
import ItemFormContainer from '../../item/components/ItemFormContainer';

class MasteryTestItemFormContainer extends Component {

  static propTypes = {
    itemsTypeUrl: PropTypes.string.isRequired,
    endpointUrl: PropTypes.string.isRequired,
  };

  render() {
    return (
      <ItemFormContainer
        itemsTypeUrl={this.props.itemsTypeUrl}
        endpointUrl={this.props.endpointUrl}
        order={MasteryTestListItemsService.items.length + 1}
        showPostPhrase={false}
      />
    );
  }
}

export default observer(MasteryTestItemFormContainer);
