import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UnitFormScene from './UnitFormScene';
import UnitFormService from '../services/UnitFormService';

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
    UnitFormService.handleLoad(this.props.params.unitId, this.props.params.moduleId);
  }

  render() {
    return (
      <UnitFormScene unitId={this.props.params.unitId} />
    );
  }
}

export default observer(UnitFormSceneContainer);
