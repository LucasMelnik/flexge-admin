import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ModuleUnitsScene from './ModuleUnitsScene';
import LoadModuleService from '../services/LoadModuleService';

class ModuleUnitsSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    LoadModuleService.handleLoad(this.props.params.moduleId);
  }

  render() {
    return (
      <ModuleUnitsScene
        module={LoadModuleService.module}
        fetching={LoadModuleService.fetch.fetching}
      />
    );
  }
}

export default observer(ModuleUnitsSceneContainer);
