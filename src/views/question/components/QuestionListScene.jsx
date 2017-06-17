import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import FloatActionButton from '../../../core/form/FloatActionButton';
import QuestionListContainer from './QuestionListContainer';
import Separator from "../../../core/layout/Separator";
import QuestionListPaginationContainer from "./QuestionListPaginationContainer";

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
   <Separator size="sm" />
   <QuestionListContainer />
   <Separator size="sm" />
   <QuestionListPaginationContainer />
 </div>
);

export default QuestionListScene;