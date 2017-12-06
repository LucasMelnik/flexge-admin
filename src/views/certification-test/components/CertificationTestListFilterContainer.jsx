import React from 'react';
import { observer } from 'mobx-react';
import CertificationTestListService from '../services/CertificationTestListService';
import CertificationTestListFilter from './CertificationTestListFilter';

const CertificationTestListFilterContainer = () => (
  <CertificationTestListFilter
    value={CertificationTestListService.filter}
    onChange={CertificationTestListService.handleFilterChange}
  />
);

export default observer(CertificationTestListFilterContainer);
