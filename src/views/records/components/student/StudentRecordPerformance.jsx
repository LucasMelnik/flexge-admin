import React from 'react';
import PropTypes from 'prop-types';
import Separator from '../../../../core/layout/Separator';
import AverageStudyQualityByClassContainer from './performance/AverageStudyQualityByClassContainer';
import StudyQualityHigherThanFiveByClassContainer from './performance/StudyQualityHigherThanFiveByClassContainer';
import ActiveStudentsByClassContainer from './performance/ActiveStudentsByClassContainer';
import ActiveStudentsLastSevenDaysByClassContainer from './performance/ActiveStudentsLastSevenDaysByClassContainer';
import StudyTimeHigherThanTwoByClassContainer from './performance/StudyTimeHigherThanTwoByClassContainer';
import LastWeekAverageStudiedTimeByClassContainer from './performance/LastWeekAverageStudiedTimeByClassContainer';
import ClassEnglishLevelOverviewContainer from './ClassEnglishLevelOverviewContainer';

const PerformanceGoalWrapper = props => (
  <div
    style={{
      flex: '0 0 200px',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 15,
      paddingRight: 15,
    }}
  >
    {props.children}
  </div>
);

const StudentRecordPerformance = props => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: -15,
        marginRight: -15,
      }}
    >
      <PerformanceGoalWrapper>
        <AverageStudyQualityByClassContainer
          schoolId={props.schoolId}
          classId={props.classId}
        />
      </PerformanceGoalWrapper>
      <PerformanceGoalWrapper>
        <StudyQualityHigherThanFiveByClassContainer
          schoolId={props.schoolId}
          classId={props.classId}
        />
      </PerformanceGoalWrapper>
      <PerformanceGoalWrapper>
        <ActiveStudentsByClassContainer
          schoolId={props.schoolId}
          classId={props.classId}
        />
      </PerformanceGoalWrapper>
      <PerformanceGoalWrapper>
        <ActiveStudentsLastSevenDaysByClassContainer
          schoolId={props.schoolId}
          classId={props.classId}
        />
      </PerformanceGoalWrapper>
      <PerformanceGoalWrapper>
        <StudyTimeHigherThanTwoByClassContainer
          schoolId={props.schoolId}
          classId={props.classId}
        />
      </PerformanceGoalWrapper>
      <PerformanceGoalWrapper>
        <LastWeekAverageStudiedTimeByClassContainer
          schoolId={props.schoolId}
          classId={props.classId}
        />
      </PerformanceGoalWrapper>
    </div>
    <Separator size="md" />
    <ClassEnglishLevelOverviewContainer
      schoolId={props.schoolId}
      classId={props.classId}
    />
  </div>
);

StudentRecordPerformance.propTypes = {
  schoolId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
};

export default StudentRecordPerformance;
