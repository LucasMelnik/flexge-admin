import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import Title from '../../../core/content/Title';
import Tabs from '../../../core/navigation/Tabs';
import FloatActionButton from '../../../core/form/FloatActionButton';
import SchoolFormContainer from './SchoolFormContainer';
import SchoolClassScene from '../../school-class/SchoolClassScene';
import TeacherScene from '../../teacher/TeacherScene';

const SchoolFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        School
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
      onClick={() => browserHistory.push('/schools')}
    />
    <Separator size="sm" />
    <SchoolFormContainer />
    <Separator size="sm" />
    {props.schoolId && (
      <Tabs
        tabs={[
          {
            label: 'Teachers',
              content: <TeacherScene />,
          },
          {
            label: 'Classes',
            content: <SchoolClassScene />,
          },
        ]}
      />
    )}
  </div>
);

SchoolFormScene.propTypes = {
  schoolId: PropTypes.string,
};

SchoolFormScene.defaultProps = {
  schoolId: null,
};

export default SchoolFormScene;
