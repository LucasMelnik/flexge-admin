import React from 'react';
import { observer } from 'mobx-react';
import CertificationTestRegisterListService from '../services/CertificationTestRegisterListService';
import CertificationTestRegisterListFilter from './CertificationTestRegisterListFilter';

const CertificationTestRegisterListFilterContainer = () => (
  <CertificationTestRegisterListFilter
    values={CertificationTestRegisterListService.form.getValues()}
    onChange={CertificationTestRegisterListService.form.setValue}
    fetching={CertificationTestRegisterListService.fetch.fetching}
    onSearch={CertificationTestRegisterListService.load}
  />
);

export default observer(CertificationTestRegisterListFilterContainer);
