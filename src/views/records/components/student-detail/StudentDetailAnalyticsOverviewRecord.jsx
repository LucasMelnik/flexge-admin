import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import round from 'lodash/round';
import findLast from 'lodash/findLast';
import Async from '../../../../core/layout/Async';
import Separator from '../../../../core/layout/Separator';
import Table from '../../../../core/form/Table';
import Tag from '../../../../core/layout/Tag';
import Icon from '../../../../core/layout/Icon';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import TooltipIcon from '../../../../core/layout/TooltipIcon';
import { englishLevelCourses } from '../../../../core/consts'

const StudentDetailAnalyticsOverviewRecord = (props) => {
  const currentCourse = findLast(englishLevelCourses, course => course.value <= props.student.currentEnglishLevel);
  return (
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
              <h1>{round(props.student.initialEnglishLevel, 1).toFixed(1)} / {props.student.initialCourse.name}</h1>
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
              <h1>{round(props.student.currentEnglishLevel, 1).toFixed(1)} / {currentCourse ? currentCourse.label : '-'}</h1>
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
      </div>
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
              label: 'Hours Grade',
              path: 'previewGrade.hoursGrade',
              align: 'center',
            },
            {
              label: (<span>Study Quality Grade <TooltipIcon text="Average Study Quality generated every Sunday at midnight" /></span>),
              path: 'previewGrade.studyQualityGrade',
              align: 'center',
            },
            {
              label: 'Preview Final Grade',
              path: 'previewGrade.finalGrade',
              align: 'center',
            },
          ]}
        />
      )}
    </Async>
  );
}

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
        studyQualityGrade: PropTypes.number,
        finalGrade: PropTypes.number,
      }),
    }),
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentDetailAnalyticsOverviewRecord;
