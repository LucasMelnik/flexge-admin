import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodAndClassService from '../../../services/ActiveStudentsByPeriodAndClassService';
import ActiveStudentsLastSevenDaysGauge from '../../../../../core/chart/ActiveStudentsLastSevenDaysGauge';

class ActiveStudentsLastSevenDaysByClassContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    classId: null,
  };

  componentWillMount() {
    ActiveStudentsByPeriodAndClassService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <ActiveStudentsLastSevenDaysGauge
        fetching={ActiveStudentsByPeriodAndClassService.fetch.fetching}
        value={ActiveStudentsByPeriodAndClassService.studiedLast7Days ?
          Number(ActiveStudentsByPeriodAndClassService.studiedLast7Days.toFixed(0)) : 0
        }
        schoolAverage={ActiveStudentsByPeriodAndClassService.schoolAverage}
      />
    );
  }
}

export default observer(ActiveStudentsLastSevenDaysByClassContainer);
