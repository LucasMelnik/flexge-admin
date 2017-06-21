import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UnitFormContainer from '../UnitFormContainer'

class UnitItemsReviewFormSceneContainer extends Component {

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

  }

  render() {
    return (
      <UnitFormContainer
        unitId={this.props.params.unitId}
        moduleId={this.props.params.moduleId}
      />
    )
  }
}

export default observer(UnitItemsReviewFormSceneContainer);
