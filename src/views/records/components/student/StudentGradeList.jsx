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
                {periodGrade.studyQualityGrade && (
                  <div>SQ: {periodGrade.studyQualityGrade} <small>(AVG SQ: {periodGrade.averageStudyQuality.toFixed(1)})</small></div>
                )}
                {!periodGrade.studyQualityGrade && (
                  <div>SQ: N/A</div>
                )}
                <div>Hours: {periodGrade.hoursGrade} <small>(Studied Hours: {moment.duration(periodGrade.hoursStudied, 'hours').format('hh:mm', { trim: false })})</small></div>
                <div><b>Final grade: {getFinalGrade(periodGrade, row.schoolClass.school) || 'Awaiting SQ Score'}</b></div>
                {periodGrade.finalGrade && (
                  <div><b>Student school grade: {periodGrade.finalGrade || 'Awaiting SQ Score'}</b></div>
                )}
                {periodGrade.finalGrade && (
                  <div><b>Maximum school grade: {row.schoolClass.school.maximumGrade || 'Awaiting SQ Score'}</b></div>
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
