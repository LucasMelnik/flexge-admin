import React from 'react';
import { observer } from 'mobx-react';
import CertificationTestExecutionListService from '../services/CertificationTestExecutionListService';
import CertificationTestExecutionListFilter from './CertificationTestExecutionListFilter';

const CertificationTestExecutionListFilterContainer = () => (
  <CertificationTestExecutionListFilter
    value={CertificationTestExecutionListService.filter}
    onChange={CertificationTestExecutionListService.handleFilterChange}
  />
);

export default observer(CertificationTestExecutionListFilterContainer);
