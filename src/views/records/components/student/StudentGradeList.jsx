import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';
import TooltipIcon from '../../../../core/layout/TooltipIcon';

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
                <span>{periodGrade.finalGrade}</span>
                <TooltipIcon
                  text={`${periodGrade.isPreview ? 'Preview -' : ''} SQ (${periodGrade.studyQualityGrade}) + Hours (${periodGrade.hoursGrade})`}
                />
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
