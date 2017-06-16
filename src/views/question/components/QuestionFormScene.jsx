import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import FloatActionButton from '../../../core/form/FloatActionButton';
import Separator from '../../../core/layout/Separator';
import QuestionFormContainer from './QuestionFormContainer';

const QuestionFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        {props.questionId ? (
          'Question Informations'
        ) : (
          'New Question'
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
      onClick={() => browserHistory.push('/questions')}
    />
    <Separator size="xs" />
    <QuestionFormContainer />
  </div>
);

QuestionFormScene.propTypes = {
  questionId: PropTypes.string,
};

QuestionFormScene.defaultProps = {
  questionId: null,
};

export default QuestionFormScene;
