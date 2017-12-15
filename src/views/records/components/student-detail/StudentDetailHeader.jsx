import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Avatar from '../../../../core/layout/Avatar';
import Async from '../../../../core/layout/Async';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';

const StudentDetailHeader = props => (
  <Async fetching={props.fetching}>
    <Row>
      <Column size={6}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            size="lg"
            src={props.student.profilePicture}
          />
          <ColumnSeparator />
          <div>
            <h1 style={{ margin: 0 }}>{props.student.name}</h1>
            <h4 style={{ margin: '-8px 0px 0px 0px' }}><i>{props.student.nickname}</i></h4>
          </div>
        </div>
      </Column>
      <Column size={2}>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          Study Quality
          <h2>{props.student.studyQuality ? props.student.studyQuality.score : 'not available yet'}</h2>
        </div>
      </Column>
      <Column size={2}>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          Course
          <h2>{props.student.currentCourse.name}</h2>
        </div>
      </Column>
      <Column size={2}>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          School Class
          <h2>{props.student.schoolClass.name}</h2>
        </div>
      </Column>
    </Row>
  </Async>
);

StudentDetailHeader.propTypes = {
  student: PropTypes.shape({
    profilePicture: PropTypes.string,
    nickname: PropTypes.string,
    name: PropTypes.string,
    studyQuality: PropTypes.shape({
      score: PropTypes.number,
    }),
    currentCourse: PropTypes.shape({
      name: PropTypes.string,
    }),
    schoolClass: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentDetailHeader;
