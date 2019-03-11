import React, { Component } from 'react';
import { observer } from 'mobx-react';
import EmailConfigFormScene from './EmailConfigFormScene';
import EmailConfigFilterService from '../services/EmailConfigFilterService';

class EmailConfigFormSceneContainer extends Component {

  componentWillMount() {
    EmailConfigFilterService.handleFilterChange(localStorage.getItem('school'));
  }

  render() {
    return (
      <EmailConfigFormScene
        schoolId={EmailConfigFilterService.schoolId}
      />
    );
  }
}

export default observer(EmailConfigFormSceneContainer);
