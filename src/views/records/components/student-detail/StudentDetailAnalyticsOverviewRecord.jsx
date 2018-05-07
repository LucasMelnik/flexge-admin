import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import round from 'lodash/round';
import get from 'lodash/get';
import Async from '../../../../core/layout/Async';
import Separator from '../../../../core/layout/Separator';
import Table from '../../../../core/form/Table';
import Tag from '../../../../core/layout/Tag';
import Icon from '../../../../core/layout/Icon';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import TooltipIcon from '../../../../core/layout/TooltipIcon';
import { englishLevelCourses } from '../../../../core/consts';

const getFinalGrade = (grade, school) => {
  const hoursGrade = grade.hoursGrade * school.percentHoursRelevanceInGrade;
  const sqGrade = grade.studyQualityGrade * school.percentStudyQualityRelevanceInGrade;

  return round((hoursGrade + sqGrade) / 100, school.gradeFormat.indexOf('.') > -1 ? 1 : 0);
};

const StudentDetailAnalyticsOverviewRecord = props => (
  <Async fetching={props.fetching}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Tag
        color="none"
        style={{
          height: 'auto',
          padding: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <span>Initial Level</span>
            <h1>{round(props.student.initialEnglishLevel, 1).toFixed(1)} / {get(englishLevelCourses.find(level => level.value === props.student.initialEnglishLevel), 'label', '-')}</h1>
          </div>
          <Icon
            name="arrow-right"
            style={{
              fontSize: 30,
              margin: '0 15px',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <span>Current Level</span>
            <h1>{round(props.student.currentEnglishLevel, 1).toFixed(1)} / {get(englishLevelCourses.find(level => level.value === props.student.currentEnglishLevel), 'label', '-')}</h1>
          </div>
        </div>
      </Tag>
      <ColumnSeparator size="lg" />
      <Tag
        color="none"
        style={{
          height: 'auto',
          padding: 10,
          textAlign: 'center',
        }}
      >
        <span>Semiannual Progress</span>
        <br />
        {/* <h1>{props.student.semiannualProgress}</h1> */}
        <h1>-</h1>
      </Tag>
      <ColumnSeparator size="lg" />
      <Tag
        color="none"
        style={{
          height: 'auto',
          padding: 10,
          textAlign: 'center',
        }}
      >
        <span>B2 Projection</span>
        <br />
        {/* <h1>{moment.duration(props.student.projection, 'months').format()}</h1> */}
        <h1>-</h1>
      </Tag>
      <ColumnSeparator size="lg" />
      <Tag
        color="none"
        style={{
          height: 'auto',
          padding: 10,
          textAlign: 'center',
        }}
      >
        <span>Average Studied time on last 4 weeks</span>
        <br />
        <h1>{moment.duration(props.student.averageStudiedTime, 'hours').format('HH:mm', { trim: false })}</h1>
      </Tag>
      <ColumnSeparator size="lg" />
      <Tag
        color="none"
        style={{
          height: 'auto',
          padding: 10,
          textAlign: 'center',
        }}
      >
        <span>Total Hours</span>
        <br />
        <h1>{moment.duration(get(props.student, 'stats.hours', 0), 'hours').format('HH:mm', { trim: false })}</h1>
      </Tag>
      <ColumnSeparator size="lg" />
      <Tag
        color="none"
        style={{
          height: 'auto',
          padding: 10,
          textAlign: 'center',
        }}
      >
        <span>Total Points</span>
        <br />
        <h1>{get(props.student, 'stats.points', 0)}</h1>
      </Tag>
    </div>
    <Separator size="md" />
    {(props.student.evaluation && props.student.evaluation.id) && (
      <Table
        bordered={false}
        rows={[props.student.evaluation]}
        columns={[
          {
            label: 'Preview Grade',
            path: 'id',
            render: (value, row) => (
              <div>
                <h2 style={{ margin: 0 }}>{row.name}</h2>
                <span>{moment(row.start).format('YYYY, MMM DD')} - {moment(row.end).format('YYYY, MMM DD')}</span>
                {row.bonusWeeks && (
                  <br />
                )}
                {row.bonusWeeks && (
                  <span>Bonus: {row.bonusWeeks} weeks</span>
                )}
              </div>
            ),
          },
          {
            label: (<span>Study Quality Grade ({get(props.student, 'schoolClass.school.percentStudyQualityRelevanceInGrade', '-')}%) <TooltipIcon text="Average Study Quality generated every Sunday at midnight" /></span>),
            path: 'previewGrade.studyQualityGrade',
            align: 'center',
            render: (grade, row) => grade ? (
              <div>
                <h2 style={{ margin: 0 }}>{grade}</h2>
                <span>Media SQ: {row.previewGrade.averageStudyQuality.toFixed(1)}</span>
                <br />
                <span>
                  {row.previewGrade.averageStudyQuality >= 10 && ('Excellent!')}
                  {(row.previewGrade.averageStudyQuality < 10 && row.previewGrade.averageStudyQuality >= 7) && ('Very Good!')}
                  {(row.previewGrade.averageStudyQuality < 7 && row.previewGrade.averageStudyQuality >= 4) && ('Good!')}
                  {(row.previewGrade.averageStudyQuality < 4 && row.previewGrade.averageStudyQuality >= 1) && ('Moderate!')}
                  {(row.previewGrade.averageStudyQuality < 1 && row.previewGrade.averageStudyQuality >= -2) && ('Weak!')}
                  {(row.previewGrade.averageStudyQuality < -2) && ('Very Weak!')}
                </span>
              </div>
            ) : (
              <div>
                <h2 style={{ margin: 0 }}>N/A</h2>
                <span>{moment().diff(moment(row.start).add(row.bonusWeeks, 'isoWeeks'), 'weeks', true).toFixed(1)} weeks to SQ Score</span>
              </div>
            ),
          },
          {
            label: `Hours Grade (${get(props.student, 'schoolClass.school.percentHoursRelevanceInGrade', '-')}%)`,
            path: 'previewGrade.hoursGrade',
            align: 'center',
            render: (grade, row) => (
              <div>
                <h2 style={{ margin: 0 }}>{grade}</h2>
                <span>Total study time: {moment.duration(row.previewGrade.hoursStudied, 'hours').format('hh:mm')}</span>
                <br />
                <span>Required study time: {moment.duration(row.previewGrade.hoursRequired, 'hours').format('hh:mm')}</span>
              </div>
            ),
          },
          {
            label: 'Preview Final Grade',
            path: 'previewGrade.finalGrade',
            align: 'center',
            render: (value, row) => value ? (
              <div>
                <h2 style={{ margin: 0 }}>{getFinalGrade(row.previewGrade, props.student.schoolClass.school)}</h2>
                <span>Preview</span>
                <br />
                <span>Student school grade: {value}</span>
                <br />
                <span>Maximum school grade: {get(props.student, 'schoolClass.school.maximumGrade', '-')}</span>
              </div>
            ) : (
              <div>
                <h2 style={{ margin: 0 }}>N/A</h2>
                <span>Awaiting SQ Score</span>
              </div>
            ),
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
    averageStudiedTime: PropTypes.number,
    name: PropTypes.string,
    lastStudied: PropTypes.string,
    semiannualProgress: PropTypes.number,
    studyQuality: PropTypes.shape({
      score: PropTypes.number,
    }),
    initialCourse: PropTypes.shape({
      name: PropTypes.string,
    }),
    evaluation: PropTypes.shape({
      id: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      name: PropTypes.string,
      previewGrade: PropTypes.shape({
        hoursGrade: PropTypes.number,
        hoursStudied: PropTypes.number,
        hoursRequired: PropTypes.number,
        studyQualityGrade: PropTypes.number,
        averageStudyQuality: PropTypes.number,
        finalGrade: PropTypes.number,
      }),
    }),
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentDetailAnalyticsOverviewRecord;
