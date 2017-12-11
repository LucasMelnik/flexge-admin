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
      <Column size={4}>
        <div style={{ display: 'flex' }}>
          <Avatar
            size="lg"
            src={props.student.profilePicture}
          />
          <ColumnSeparator />
          <h1>{props.student.nickname || props.student.name}</h1>
        </div>
      </Column>
      <Column size={1}>
        Study Quality
        <h2>{props.student.studyQuality.score}</h2>
      </Column>
      <Column size={1}>
        Course
        <h2>{props.student.currentCourse.name}</h2>
      </Column>
    </Row>
    <Row>
      <Column size={4}>
        Name
        <p>{props.student.name}</p>
      </Column>
      <Column size={4}>
        School Class
        <p>{props.student.schoolClass.name}</p>
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
