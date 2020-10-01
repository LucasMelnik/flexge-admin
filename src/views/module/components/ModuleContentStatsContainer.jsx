import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import LoadModuleContentStatsService from '../services/LoadModuleContentStatsService';
import Async from '../../../core/layout/Async';
import ModuleContentStats from './ModuleContentStats';

class ModuleContentStatsContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
  };

  loadModuleContentStatsService = new LoadModuleContentStatsService();

  componentWillMount() {
    this.loadModuleContentStatsService.handleLoad(this.props.moduleId);
  }

  render() {
    return (
      <Async fetching={this.loadModuleContentStatsService.fetch.fetching}>
        <ModuleContentStats
          stats={toJS(this.loadModuleContentStatsService.stats)}
          grammarColors={toJS(this.loadModuleContentStatsService.grammarColors)}
          itemTypeColors={toJS(this.loadModuleContentStatsService.itemTypeColors)}
        />
      </Async>
    );
  }
}

export default observer(ModuleContentStatsContainer);
