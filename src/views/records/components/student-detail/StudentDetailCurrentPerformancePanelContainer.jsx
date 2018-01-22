import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Card from '../../../../core/layout/Card';
import Separator from '../../../../core/layout/Separator';
import StudentGrammarNeedsListContainer from '../common/StudentGrammarNeedsListContainer';
import StudentDetailAnalyticsAcademicPerformanceContainer from './StudentDetailAnalyticsAcademicPerformanceContainer';
import StudentAcademicPerformanceHistoryService from '../../services/StudentAcademicPerformanceHistoryService';

const StudentDetailCurrentPerformancePanelContainer = props => (
  <Card title={`Academic Performance of Current Course - ${StudentAcademicPerformanceHistoryService.currentPerformance.name || ''}`}>
    <StudentDetailAnalyticsAcademicPerformanceContainer />
    <Separator />
    <StudentGrammarNeedsListContainer studentId={props.studentId} />
  </Card>
);

StudentDetailCurrentPerformancePanelContainer.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default observer(StudentDetailCurrentPerformancePanelContainer);
