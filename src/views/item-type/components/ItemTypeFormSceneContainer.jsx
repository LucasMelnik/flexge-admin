import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ItemTypeFormScene from './ItemTypeFormScene';

class ItemTypeFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      itemTypeId: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <ItemTypeFormScene
        itemTypeId={this.props.params.itemTypeId}
      />
    );
  }
}

export default observer(ItemTypeFormSceneContainer);
