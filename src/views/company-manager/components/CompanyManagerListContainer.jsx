import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyManagerList from './CompanyManagerList';
import CompanyManagerListService from '../services/CompanyManagerListService';

const CompanyManagerListContainer = props => (
  <CompanyManagerList
    managers={toJS(CompanyManagerListService.managers)}
    fetching={CompanyManagerListService.fetch.fetching}
    onRowClick={props.onRowClick}
  />
);

CompanyManagerListContainer.propTypes = {
  onRowClick: PropTypes.func.isRequired,
};

export default observer(CompanyManagerListContainer);
