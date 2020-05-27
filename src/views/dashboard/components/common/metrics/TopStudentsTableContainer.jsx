import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import TopStudentsByPeriodService from '../../../services/TopStudentsByPeriodService';
import TopStudentsTable from './TopStudentsTable';

class TopStudentsTableContainer extends Component {
  static propTypes = {
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
    days: PropTypes.number.isRequired,
  }

  topStudentsByPeriodService = new TopStudentsByPeriodService();

  componentWillMount() {
    this.topStudentsByPeriodService.load(this.props.from, this.props.to, this.props.query);
  }

  render() {
    return (
      <TopStudentsTable
        days={this.props.days}
        data={toJS(this.topStudentsByPeriodService.data)}
        loading={this.topStudentsByPeriodService.fetch.fetching}
      />
    );
  }
}

export default observer(TopStudentsTableContainer);
