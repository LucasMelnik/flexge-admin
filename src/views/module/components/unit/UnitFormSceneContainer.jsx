import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UnitFormScene from './UnitFormScene';
import UnitFormService from '../../services/UnitFormService';
import LoadModuleService from '../../services/LoadModuleService';

class UnitFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      unitId: PropTypes.string,
      moduleId: PropTypes.string,
    }),
  }

  static defaultProps = {
    params: PropTypes.shape({
      unitId: null,
      moduleId: null,
    }),
  }

  componentWillMount() {
    LoadModuleService.handleLoad(this.props.params.moduleId);
  }

  render() {
    return (
      <UnitFormScene
        unitId={this.props.params.unitId}
        moduleId={this.props.params.moduleId}
        module={LoadModuleService.module}
      />
    );
  }
}

export default observer(UnitFormSceneContainer);
