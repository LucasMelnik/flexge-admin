import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MasteryTestFormScene from './MasteryTestFormScene';
import MasteryTestFormService from '../services/MasteryTestFormService';

class MasteryTestFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string,
      masteryTestId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    MasteryTestFormService.handleLoad(this.props.params.moduleId, this.props.params.masteryTestId);
    MasteryTestFormService.handleLoadItems(this.props.params.masteryTestId);
  }

  render() {
    return (
      <MasteryTestFormScene
        moduleId={this.props.params.moduleId}
        masteryTestId={this.props.params.masteryTestId}
        order={MasteryTestFormService.items.length + 1}
      />
    );
  }
}

export default observer(MasteryTestFormSceneContainer);
