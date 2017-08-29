import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import LoadModuleService from '../../module/services/LoadModuleService';
import MasteryTestFormScene from './MasteryTestFormScene';

class MasteryTestFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string.isRequired,
      masteryTestId: PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    LoadModuleService.handleLoad(this.props.params.moduleId);
  }

  render() {
    return (
      <MasteryTestFormScene
        fetching={LoadModuleService.fetch.fetching}
        module={LoadModuleService.module}
        masteryTestId={this.props.params.masteryTestId}
      />
    );
  }
}

export default observer(MasteryTestFormSceneContainer);
