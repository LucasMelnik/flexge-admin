import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import FloatActionButton from '../../../core/form/FloatActionButton';
import StudentFormContainer from './StudentFormContainer';

const StudentFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        {props.studentId ? (
          'Student informations'
        ) : (
          'New Student'
        )}
      </Title>
    </InlineBlock>
    <FloatActionButton
      secondary
      icon="arrow_back"
      style={{
        position: 'relative',
        float: 'right',
        top: 20,
        right: 20,
      }}
      onClick={() => browserHistory.push('/students')}
    />
    <Separator size="sm" />
    <StudentFormContainer />
  </div>
);

StudentFormScene.propTypes = {
  studentId: PropTypes.string,
};
StudentFormScene.defaultProps = {
  studentId: null,
};

export default StudentFormScene;
