import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodAndClassService from '../../../services/ActiveStudentsByPeriodAndClassService';
import ActiveStudentsGauge from '../../../../../core/chart/ActiveStudentsGauge';

class ActiveStudentsByClassContainer extends Component {
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
      <ActiveStudentsGauge
        fetching={ActiveStudentsByPeriodAndClassService.fetch.fetching}
        value={ActiveStudentsByPeriodAndClassService.totalActiveStudents ?
          Number(ActiveStudentsByPeriodAndClassService.totalActiveStudents.toFixed(0)) : 0
        }
        schoolAverage={ActiveStudentsByPeriodAndClassService.schoolAverage}
      />
    );
  }
}

export default observer(ActiveStudentsByClassContainer);
