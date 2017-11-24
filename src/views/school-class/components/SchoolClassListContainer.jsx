import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolClassList from './SchoolClassList';
import SchoolClassListService from '../services/SchoolClassListService';

class SchoolClassListContainer extends Component {

  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    schoolId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    SchoolClassListService.init(this.props.schoolId);
  }

  render() {
    return (
      <SchoolClassList
        classes={toJS(SchoolClassListService.classes)}
        fetching={SchoolClassListService.fetch.fetching}
        onDelete={SchoolClassListService.handleDelete}
        baseUrl={this.props.baseUrl}
      />
    );
  }
}

export default observer(SchoolClassListContainer);
