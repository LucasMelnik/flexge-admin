import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import Title from '../../../core/content/Title';
import FloatActionButton from '../../../core/form/FloatActionButton';
import ModuleFormContainer from './ModuleFormContainer';

const ModuleFormScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Module
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
      onClick={() => browserHistory.push('/modules')}
    />
    <Separator size="sm" />
    <ModuleFormContainer />
    <Separator size="sm" />
  </div>
);

ModuleFormScene.propTypes = {
  moduleId: PropTypes.string,
};

ModuleFormScene.defaultProps = {
  moduleId: null,
};

export default ModuleFormScene;
