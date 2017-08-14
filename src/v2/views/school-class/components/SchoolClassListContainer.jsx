import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolClassList from './SchoolClassList';
import SchoolClassListService from '../services/SchoolClassListService';

class SchoolClassListContainer extends Component {

  componentDidMount() {
    SchoolClassListService.init();
  }

  render() {
    return (
      <SchoolClassList
        schools={toJS(SchoolClassListService.classes)}
        fetching={SchoolClassListService.fetch.fetching}
        onDelete={SchoolClassListService.handleRemove}
      />
    );
  }
}

export default observer(SchoolClassListContainer);
