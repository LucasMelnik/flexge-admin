import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import Title from '../../../core/content/Title';
import FloatActionButton from '../../../core/form/FloatActionButton';
import TeacherFormContainer from './TeacherFormContainer';

const TeacherFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        {props.teacherId ? (
          'Teacher Informations'
        ) : (
          'New Teacher'
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
      onClick={() => browserHistory.push('/teachers')}
    />
    <Separator size="sm" />
    <TeacherFormContainer />
  </div>
);

TeacherFormScene.propTypes = {
  teacherId: PropTypes.string,
};

TeacherFormScene.defaultProps = {
  teacherId: null,
};

export default TeacherFormScene;
