import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolFormScene from './SchoolFormScene';
import SchoolFormService from '../services/SchoolFormService';

class SchoolFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    SchoolFormService.handleLoad(this.props.params.schoolId);
  }

  render() {
    return (
      <SchoolFormScene
        schoolId={SchoolFormService.schoolId}
      />
    );
  }
}

export default observer(SchoolFormSceneContainer);
