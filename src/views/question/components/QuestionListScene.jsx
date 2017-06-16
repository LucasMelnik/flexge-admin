import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import FloatActionButton from '../../../core/form/FloatActionButton';

const QuestionListScene = () => (
 <div>
   <InlineBlock>
     <Title>
       Questions
     </Title>
   </InlineBlock>
   <FloatActionButton
     secondary
     icon="add"
     style={{ position: 'relative',
       float: 'right',
       top: 20,
       right: 20,
     }}
     onClick={() => browserHistory.push('/questions/new')}
   />
 </div>
);

export default QuestionListScene;