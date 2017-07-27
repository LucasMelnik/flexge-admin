import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PlacementTestFormService from '../services/PlacementTestFormService';
import ItemFormContainer from '../../item/components/ItemFormContainer';

class PlacementTestItemFormContainer extends Component {

  static propTypes = {
    placementTestId: PropTypes.string.isRequired,
    onSaveSuccess: PropTypes.func.isRequired,
  };

  componentWillMount() {
    PlacementTestFormService.handleLoad(this.props.placementTestId);
  }

  render() {
    return (
      <ItemFormContainer
        itemsTypeUrl="/item-types?query[allowedForPlacementTest]=true"
        endpointUrl={`grammar-placement-test-levels/${this.props.placementTestId}/items`}
        onSaveSuccess={this.props.onSaveSuccess}
        defaultGrammar={PlacementTestFormService.form.getValue('grammar')}
        isTestItem
      />
    );
  }
}

export default observer(PlacementTestItemFormContainer);
