import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolManagerList from './SchoolManagerList';
import SchoolManagerListService from '../services/SchoolManagerListService';

const SchoolManagerListContainer = props => (
  <SchoolManagerList
    managers={toJS(SchoolManagerListService.managers)}
    fetching={SchoolManagerListService.fetch.fetching}
    onRowClick={props.onRowClick}
    onDelete={SchoolManagerListService.handleDelete}
  />
);

SchoolManagerListContainer.propTypes = {
  onRowClick: PropTypes.func.isRequired,
};

export default observer(SchoolManagerListContainer);
