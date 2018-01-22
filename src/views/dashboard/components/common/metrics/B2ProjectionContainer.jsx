import React from 'react';
import { observer } from 'mobx-react';
import B2Projection from './B2Projection';
import SemiannualAverageEnglishLevelProgressService from '../../../services/SemiannualAverageEnglishLevelProgressService';

const B2ProjectionContainer = () => (
  <B2Projection
    projection={SemiannualAverageEnglishLevelProgressService.projection}
    loading={SemiannualAverageEnglishLevelProgressService.fetch.fetching}
  />
);

export default observer(B2ProjectionContainer);
