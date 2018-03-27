import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentAchievementsList from './StudentAchievementsList';
import StudentAchievementsListService from '../services/StudentAchievementsListService';

class StudentAchievementsListContainer extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['national', 'regional', 'school']).isRequired,
  };

  render() {
    return (
      <StudentAchievementsList
        achievements={toJS(StudentAchievementsListService.achievements[this.props.type])}
        fetching={StudentAchievementsListService.fetch.fetching}
        onDownload={StudentAchievementsListService.handleDownloadCertificate}
      />
    );
  }
}

export default observer(StudentAchievementsListContainer);
