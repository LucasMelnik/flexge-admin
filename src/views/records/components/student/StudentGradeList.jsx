import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';


const StudentGradeList = props => (
  <Table
    rows={props.students}
    fetching={props.fetching}
    scroll={{
      x: (props.evaluationPeriods.filter(e => e.type === 'EVALUATION').length * 310) + (props.evaluationPeriods.filter(e => e.type === 'RECESS').length * 170) + 250,
      y: 'calc(100vh - 300px)',
    }}
    columns={[
      {
        label: 'Student',
        path: 'name',
        fixed: 'left',
        width: 250,
      },
      ...props.evaluationPeriods.map(evaluation => ({
        label: (
          <span>
            <b>{evaluation.name}</b>
            <br />
            {moment(evaluation.start).format('DD/MM/YY')} - {moment(evaluation.end).format('DD/MM/YY')}
          </span>
        ),
        path: `grade_${evaluation.id}`,
        width: {
          EVALUATION: 310,
          RECESS: 170,
        }[evaluation.type],
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
                <div>
                  Hours: {periodGrade.hoursGrade}{' '}
                  <small>
                    (Studied: {moment.duration(periodGrade.hoursStudied, 'hours').format('hh:mm', { trim: false })}
                      {' '}
                      Required: {moment.duration(periodGrade.hoursRequired, 'hours').format('hh:mm', { trim: false })})
                  </small>
                </div>
                <div>Final grade: {periodGrade.formattedFinalGrade || 'Awaiting SQ Score'}</div>
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
