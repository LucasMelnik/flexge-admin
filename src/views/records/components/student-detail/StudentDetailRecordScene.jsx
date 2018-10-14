import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../../../core/layout/Tabs';
import Card from '../../../../core/layout/Card';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import StudentDetailContentRecordListContainer from './StudentDetailContentRecordListContainer';
import StudentDetailDateRecordListContainer from './StudentDetailDateRecordListContainer';
import Separator from '../../../../core/layout/Separator';
import StudentDetailHeaderContainer from './StudentDetailHeaderContainer';
import StudentDetailAnalyticsOverviewRecordContainer from './StudentDetailAnalyticsOverviewRecordContainer';
import StudentDetailAnalyticsStudiedTimeChartContainer from './StudentDetailAnalyticsStudiedTimeChartContainer';
import StudentDetailAnalyticsStudyQualityChartContainer from './StudentDetailAnalyticsStudyQualityChartContainer';
import StudentDetailAnalyticsAcademicPerformanceHistoryContainer from './StudentDetailAnalyticsAcademicPerformanceHistoryContainer';
import StudentDetailContentRecordListFilterContainer from './StudentDetailContentRecordListFilterContainer';
import StudentDetailCurrentPerformancePanelContainer from './StudentDetailCurrentPerformancePanelContainer';
import StudentDetailUnitResultDialogContainer from './StudentDetailUnitResultDialogContainer';
import StudentDetailAchievementListContainer from './StudentDetailAchievementListContainer';
import StudentStudiedGrammarListContainer from '../common/StudentStudiedGrammarListContainer';

const StudentDetailRecordScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: 'Records',
          link: '/records/filters',
        },
        {
          text: props.school.name,
          link: `/records/schools/${props.school.id}/classes`,
        },
        {
          text: props.class.name,
          link: `/records/schools/${props.school.id}/classes/${props.class.id}/students`,
        },
        {
          text: props.student.name,
        },
      ]}
    />
    <Card>
      <StudentDetailHeaderContainer studentId={props.studentId} />
    </Card>
    <Separator />
    <Tabs
      tabs={[
        {
          title: 'Analytics',
          content:
            (
              <div>
                <Card title="Overview">
                  <StudentDetailAnalyticsOverviewRecordContainer studentId={props.studentId} />
                </Card>
                <Separator />
                <StudentDetailCurrentPerformancePanelContainer studentId={props.studentId} />
                <Separator />
                <Card title="History">
                  <StudentDetailAnalyticsAcademicPerformanceHistoryContainer studentId={props.studentId} />
                  <Separator />
                  <StudentDetailAnalyticsStudiedTimeChartContainer studentId={props.studentId} />
                  <Separator />
                  <StudentDetailAnalyticsStudyQualityChartContainer studentId={props.studentId} />
                </Card>
              </div>
            ),
        },
        {
          title: 'Content Progress',
          content:
            (
              <Card>
                <StudentDetailContentRecordListFilterContainer studentId={props.studentId} />
                <Separator size="xs" />
                <StudentDetailContentRecordListContainer studentId={props.studentId} />
              </Card>
            ),
        },
        {
          title: 'Daily Progress',
          content:
            (
              <Card>
                <StudentDetailDateRecordListContainer studentId={props.studentId} />
              </Card>
            ),
        },
        {
          title: 'Studied Grammars - last 60 days',
          content: (
            <Card>
              <StudentStudiedGrammarListContainer studentId={props.studentId} />
            </Card>
          ),
        },
        {
          title: 'Achievements',
          content:
           (
             <Card>
               <StudentDetailAchievementListContainer studentId={props.studentId} />
             </Card>
           ),
        },

      ]}
    />
    <StudentDetailUnitResultDialogContainer />
  </div>
);

StudentDetailRecordScene.propTypes = {
  schoolId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  school: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  class: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  student: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

StudentDetailRecordScene.defaultProps = {
  school: {},
  class: {},
  student: {},
};


export default StudentDetailRecordScene;
