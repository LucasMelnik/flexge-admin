import React from 'react';
import { observer } from 'mobx-react/index';
import KidsCertificatesListFilter from './KidsCertificatesListFilter';
import KidsCertificateListService from '../services/KidsCertificateListService';

const KidsCertificatesListFilterContainer = () => (
  <KidsCertificatesListFilter
    values={KidsCertificateListService.form.getValues()}
    onChange={KidsCertificateListService.form.setValue}
    onSubmit={KidsCertificateListService.load}
    fetching={KidsCertificateListService.fetch.fetching}
  />
);

export default observer(KidsCertificatesListFilterContainer);
