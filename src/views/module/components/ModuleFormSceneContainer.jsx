import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ModuleFormScene from './ModuleFormScene';
import ModuleFormService from '../services/ModuleFormService';

class ModuleFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    ModuleFormService.handleLoad(this.props.params.moduleId);
  }

  render() {
    return (
      <ModuleFormScene moduleId={ModuleFormService.moduleId} />
    );
  }
}

export default observer(ModuleFormSceneContainer);
