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
          const periodGrade = row.grades.find(grade => grade.evaluation.id === evaluation.id);
          if (periodGrade) {
            return (<span>{periodGrade.studyQualityGrade} (<b>SQ</b>) + {periodGrade.studyQualityGrade} (<b>Hours</b>) = {periodGrade.finalGrade} <b>Final Grade {periodGrade.isPreview ? '(P)' : ''} </b></span>);
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
