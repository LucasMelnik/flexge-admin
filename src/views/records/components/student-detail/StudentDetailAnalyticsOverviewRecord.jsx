import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Async from '../../../../core/layout/Async';
import Separator from '../../../../core/layout/Separator';
import Table from '../../../../core/form/Table';

const StudentDetailAnalyticsOverviewRecord = props => (
  <Async fetching={props.fetching}>
    <Row>
      <Column size={1}>
        <b>Initial level</b>
        <br />
        {props.student.initialEnglishLevel}
      </Column>
      <Column size={1}>
        <b>Current level</b>
        <br />
        {props.student.currentEnglishLevel}
      </Column>
      <Column size={2}>
        <b>Semiannual Progress</b>
        <br />
        {props.student.semiannualProgress}
      </Column>
      <Column size={1}>
        <b>B2 Projection</b>
        <br />
        {moment.duration(props.student.projection, 'months').format()}
      </Column>
      <Column size={1}>
        <b>Study Quality</b>
        <br />
        {props.student.studyQuality ? props.student.studyQuality.score : 'Study Quality not available yet'}
      </Column>
      <Column size={1}>
        <b>Last Studied</b>
        <br />
        {moment(props.student.lastStudied).format('YYYY, MMMM DD')}
      </Column>
    </Row>
    <Separator size="md" />
    {(props.student.evaluation && props.student.evaluation.id) && (
      <Table
        bordered={false}
        rows={[props.student.evaluation]}
        columns={[
          {
            label: 'Preview Grade',
            path: 'name',
            render: (value, row) => (
              <div>
                <b>{value}</b>
                <br />
                <span>{moment(row.start).format('YYYY, MMM DD')} - {moment(row.end).format('YYYY, MMM DD')}</span>
              </div>
            ),
          },
          {
            label: 'Hours',
            path: 'previewGrade.hoursGrade',
          },
          {
            label: 'Study Quality',
            path: 'previewGrade.studyQualityGrade',
          },
          {
            label: 'Preview Final Grade',
            path: 'previewGrade.finalGrade',
          },
        ]}
      />
    )}
  </Async>
);

StudentDetailAnalyticsOverviewRecord.propTypes = {
  student: PropTypes.shape({
    initialEnglishLevel: PropTypes.number,
    currentEnglishLevel: PropTypes.number,
    projection: PropTypes.number,
    name: PropTypes.string,
    lastStudied: PropTypes.string,
    semiannualProgress: PropTypes.number,
    studyQuality: PropTypes.shape({
      score: PropTypes.number,
    }),
    evaluation: PropTypes.shape({
      id: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      name: PropTypes.string,
      previewGrade: PropTypes.shape({
        hoursGrade: PropTypes.number,
        studyQualityGrade: PropTypes.number,
        finalGrade: PropTypes.number,
      }),
    }),
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentDetailAnalyticsOverviewRecord;
