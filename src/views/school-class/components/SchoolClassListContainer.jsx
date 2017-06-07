import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolClassList from './SchoolClassList';
import SchoolClassListService from '../services/SchoolClassListService';

const SchoolClassListContainer = props => (
  <SchoolClassList
    classes={toJS(SchoolClassListService.classes)}
    fetching={SchoolClassListService.fetch.fetching}
    onSelect={props.onSelect}
    onDelete={SchoolClassListService.handleDelete}
  />
);

SchoolClassListContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default observer(SchoolClassListContainer);
