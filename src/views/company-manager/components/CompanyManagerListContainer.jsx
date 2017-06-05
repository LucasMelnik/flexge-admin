import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyManagerList from './CompanyManagerList';
import CompanyManagerListService from '../services/CompanyManagerListService';

const CompanyManagerListContainer = () => (
  <CompanyManagerList
    managers={toJS(CompanyManagerListService.managers)}
    fetching={CompanyManagerListService.fetch.fetching}
  />
);

export default observer(CompanyManagerListContainer);
