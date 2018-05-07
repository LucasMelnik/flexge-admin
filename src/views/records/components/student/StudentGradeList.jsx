import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import moment from 'moment';
import Table from '../../../../core/form/Table';

const getFinalGrade = (grade, school) => {
  const hoursGrade = grade.hoursGrade * school.percentHoursRelevanceInGrade;
  const sqGrade = grade.studyQualityGrade * school.percentStudyQualityRelevanceInGrade;

  return round((hoursGrade + sqGrade) / 100, school.gradeFormat.indexOf('.') > -1 ? 1 : 0);
};


const StudentGradeList = props => (
  <Table
    rows={props.students}
    fetching={props.fetching}
    columns={[
      {
        label: 'Student',
        path: 'name',
      },
      ...props.evaluationPeriods.map(evaluation => ({
        label: `${moment(evaluation.start).format('DD/MM/YY')} - ${moment(evaluation.end).format('DD/MM/YY')}`,
        path: `grade_${evaluation.id}`,
        render: (cell, row) => {
          const periodGrade = row.grades.find(grade => (grade.evaluationPeriod.id || grade.evaluationPeriod) === evaluation.id);
          if (periodGrade) {
            return (
              <div>
                {periodGrade.studyQualityGrade !== null ? (
                  <div>SQ: {periodGrade.studyQualityGrade} <small>(AVG SQ: {periodGrade.averageStudyQuality !== null ? periodGrade.averageStudyQuality.toFixed(1) : 'N/A'})</small></div>
                ) : (
                  <div>SQ: N/A</div>
                )}
                <div>Hours: {periodGrade.hoursGrade} <small>(Studied Hours: {moment.duration(periodGrade.hoursStudied, 'hours').format('hh:mm', { trim: false })})</small></div>
                <div>Final grade: {getFinalGrade(periodGrade, row.schoolClass.school) !== null ? getFinalGrade(periodGrade, row.schoolClass.school) : 'Awaiting SQ Score'}</div>
                {periodGrade.finalGrade !== null && (
                  <div>
                    <b>Student school grade: {periodGrade.finalGrade !== null ? periodGrade.finalGrade : 'Awaiting SQ Score'}</b>
                    <small> (Max school grade: {row.schoolClass.school.maximumGrade})</small>
                  </div>
                )}
              </div>
            );
          }
          return '-';
        },
      })),
    ]}
  />
);

StudentGradeList.propTypes = {
  fetching: PropTypes.bool.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  evaluationPeriods: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StudentGradeList;
