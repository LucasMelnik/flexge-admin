import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TopStudentsByPeriodService from '../../../services/TopStudentsByPeriodService';
import TopStudentsTable from './TopStudentsTable';

class TopStudentsTableContainer extends Component {
  static propTypes = {
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
    days: PropTypes.number.isRequired,
  }

  dataService = new TopStudentsByPeriodService();

  componentWillMount() {
    this.dataService.load(this.props.from, this.props.to);
  }

  render() {
    return (
      <TopStudentsTable
        days={this.props.days}
        data={this.dataService.data}
        loading={this.dataService.fetch.fetching}
      />
    );
  }
}

export default observer(TopStudentsTableContainer);
