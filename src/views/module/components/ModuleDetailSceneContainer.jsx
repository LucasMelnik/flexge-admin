import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import LoadModuleService from '../services/LoadModuleService';
import ModuleDetailScene from './ModuleDetailScene';

class ModuleDetailSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    LoadModuleService.handleLoad(this.props.params.moduleId);
  }

  render() {
    return (
      <ModuleDetailScene
        module={LoadModuleService.module}
        fetching={LoadModuleService.fetch.fetching}
      />
    );
  }
}

export default observer(ModuleDetailSceneContainer);
