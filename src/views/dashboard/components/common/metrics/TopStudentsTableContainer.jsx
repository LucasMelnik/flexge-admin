import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TopStudentsByPeriodService from '../../../services/TopStudentsByPeriodService';
import TopStudentsTable from './TopStudentsTable';

class TopStudentsTableContainer extends Component {
  static propTypes = {
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
  }

  topStudentsByPeriodService = new TopStudentsByPeriodService();

  componentWillMount() {
    this.topStudentsByPeriodService.load(this.props.from, this.props.to);
  }

  render() {
    return (
      <TopStudentsTable
        data={this.topStudentsByPeriodService.topStudentsByPeriod}
        loading={this.topStudentsByPeriodService.fetch.fetching}
      />
    );
  }
}

export default observer(TopStudentsTableContainer);
