import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolList from './SchoolList';
import SchoolListService from '../services/SchoolListService';

class SchoolListContainer extends Component {

  componentDidMount() {
    SchoolListService.load();
  }

  render() {
    return (
      <SchoolList
        schools={toJS(SchoolListService.schools)}
        fetching={SchoolListService.fetch.fetching}
      />
    );
  }
}

export default observer(SchoolListContainer);
