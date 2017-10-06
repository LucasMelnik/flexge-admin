import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import SchoolClassRecordList from './SchoolClassRecordList';
import SchoolClassRecordListService from '../../services/SchoolClassRecordListService';

class SchoolClassRecordListContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    SchoolClassRecordListService.init(this.props.schoolId);
  }

  handleSelect = (schoolClass) => {
    browserHistory.push(`/records/school/${this.props.schoolId}/class/${schoolClass.id}`);
  };

  render() {
    return (
      <SchoolClassRecordList
        schoolClasses={toJS(SchoolClassRecordListService.schoolClasses)}
        fetching={SchoolClassRecordListService.fetch.fetching}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default observer(SchoolClassRecordListContainer);
