import React from 'react';
import { observer } from 'mobx-react';
import B2Projection from './B2Projection';
import ClassSemiannualAverageEnglishLevelProgressService from '../../../services/ClassSemiannualAverageEnglishLevelProgressService';

const B2ProjectionContainer = () => (
  <B2Projection
    projection={ClassSemiannualAverageEnglishLevelProgressService.projection}
  />
);

export default observer(B2ProjectionContainer);
