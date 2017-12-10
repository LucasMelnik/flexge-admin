import React from 'react';
import { observer } from 'mobx-react';
import B2Projection from './B2Projection';
import SemiannualEnglishLevelProgressService from '../../../services/SemiannualEnglishLevelProgressService';

const B2ProjectionContainer = () => (
  <B2Projection
    projection={SemiannualEnglishLevelProgressService.projection}
    loading={SemiannualEnglishLevelProgressService.fetch.fetching}
  />
);

export default observer(B2ProjectionContainer);
