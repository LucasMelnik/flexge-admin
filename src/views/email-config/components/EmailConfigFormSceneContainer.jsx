import React, { Component } from 'react';
import { observer } from 'mobx-react';
import EmailConfigFormScene from './EmailConfigFormScene';
import EmailConfigFilterService from '../services/EmailConfigFilterService';

class EmailConfigFormSceneContainer extends Component {

  componentWillMount() {
    const school = JSON.parse(localStorage.getItem('school'));
    EmailConfigFilterService.handleFilterChange(school ? school._id : null);
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
