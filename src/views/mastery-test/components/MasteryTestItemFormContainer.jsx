import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MasteryTestListItemsService from '../services/MasteryTestListItemsService';
import ItemFormContainer from '../../item/components/ItemFormContainer';

class MasteryTestItemFormContainer extends Component {

  static propTypes = {
    academicPlanId: PropTypes.string.isRequired,
    endpointUrl: PropTypes.string.isRequired,
    onSaveSuccess: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ItemFormContainer
        itemsTypeUrl={`/item-types?query[allowedForMasteryTest]=true&query[academicPlan]=${this.props.academicPlanId}`}
        endpointUrl={this.props.endpointUrl}
        order={MasteryTestListItemsService.items.length + 1}
        showPostPhrase={false}
        onSaveSuccess={this.props.onSaveSuccess}
        timeProperty="defaultMasteryTestTime"
        isTestItem
      />
    );
  }
}

export default observer(MasteryTestItemFormContainer);
