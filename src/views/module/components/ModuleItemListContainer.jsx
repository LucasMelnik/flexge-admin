import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ModuleItemListService from '../services/ModuleItemListService';
import ModuleItemList from './ModuleItemList';

class ModuleItemListContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    unit: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    ModuleItemListService.init(this.props.moduleId, this.props.unit.id);
  }

  render() {
    return (
      <ModuleItemList
        unit={this.props.unit}
        items={toJS(ModuleItemListService.items)}
        fetching={ModuleItemListService.fetch.fetching}
        onLink={ModuleItemListService.handleLinkToUnit}
      />
    );
  }
}

export default observer(ModuleItemListContainer);
