import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ConfigurationList from './ConfigurationList';
import ConfigurationListService from '../services/ConfigurationListService';

class ConfigurationListContainer extends Component {

  componentDidMount() {
    ConfigurationListService.init();
  }

  render() {
    return (
      <ConfigurationList
        configurations={toJS(ConfigurationListService.configurations)}
        fetching={ConfigurationListService.fetch.fetching}
      />
    );
  }
}

export default observer(ConfigurationListContainer);
