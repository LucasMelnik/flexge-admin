import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ManagerList from './ManagerList';
import ManagerListService from '../services/ManagerListService';

const ManagerListContainer = props => (
  <ManagerList
    managers={toJS(ManagerListService.managers)}
    fetching={ManagerListService.fetch.fetching}
    onDelete={ManagerListService.handleRemove}
    onEdit={props.onEdit}
  />
);

ManagerListContainer.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default observer(ManagerListContainer);
