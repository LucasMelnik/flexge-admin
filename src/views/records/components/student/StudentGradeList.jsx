import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';

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
                <div><b>Final Grade: {periodGrade.finalGrade || 'Awaiting SQ Score'}</b></div>
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
