import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import Block from 'jsxstyle/Block';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import Title from '../../../core/content/Title';
import Tabs from '../../../core/navigation/Tabs';
import FloatActionButton from '../../../core/form/FloatActionButton';
import SchoolFormContainer from './SchoolFormContainer';
import SchoolClassSceneContainer from '../../school-class/components/SchoolClassSceneContainer';
import SchoolManagerSceneContainer from '../../school-manager/components/SchoolManagerSceneContainer';

const SchoolFormScene = props => (
  <Block position="relative">
    <InlineBlock>
      <Title>
        School
      </Title>
    </InlineBlock>
    <FloatActionButton
      secondary
      icon="arrow_back"
      style={{
        position: 'absolute',
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
            content: <SchoolClassSceneContainer schoolId={props.schoolId} />,
            label: 'Classes',
          },
          {
            content: <SchoolManagerSceneContainer schoolId={props.schoolId} />,
            label: 'Managers',
          },
        ]}
      />
    )}
  </Block>
);

SchoolFormScene.propTypes = {
  schoolId: PropTypes.string,
};

SchoolFormScene.defaultProps = {
  schoolId: null,
};

export default SchoolFormScene;
