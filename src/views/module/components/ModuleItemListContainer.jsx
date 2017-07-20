import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ModuleItemListService from '../services/ModuleItemListService';
import ModuleItemList from './ModuleItemList';

class ModuleItemListContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    ModuleItemListService.init(this.props.moduleId);
  }

  render() {
    return (
      <ModuleItemList
        items={toJS(ModuleItemListService.items)}
        itemTypesUrl={this.props.itemTypesUrl}
        fetching={ModuleItemListService.fetch.fetching}
      />
    );
  }
}

export default observer(ModuleItemListContainer);
