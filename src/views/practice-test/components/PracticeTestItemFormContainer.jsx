import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PracticeTestListItemsService from '../services/PracticeTestListItemsService';
import ItemFormContainer from '../../item/components/ItemFormContainer';

class PracticeTestItemFormContainer extends Component {

  static propTypes = {
    endpointUrl: PropTypes.string.isRequired,
    onSaveSuccess: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ItemFormContainer
        itemsTypeUrl="/item-types?query[allowedForPlacementTest]=true"
        endpointUrl={this.props.endpointUrl}
        order={PracticeTestListItemsService.items.length + 1}
        onSaveSuccess={this.props.onSaveSuccess}
        timeProperty="defaultPracticeTestTime"
        isTestItem
      />
    );
  }
}

export default observer(PracticeTestItemFormContainer);
