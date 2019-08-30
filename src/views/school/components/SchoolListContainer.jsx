import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolList from './SchoolList';
import SchoolListService from '../services/SchoolListService';

class SchoolListContainer extends Component {

  static propTypes = {
    baseUrl: PropTypes.string,
    companyId: PropTypes.string,
  };

  static defaultProps = {
    baseUrl: '',
    companyId: null,
  };

  componentDidMount() {
    SchoolListService.init(this.props.companyId);
  }

  render() {
    return (
      <SchoolList
        baseUrl={this.props.baseUrl}
        schools={toJS(SchoolListService.schools)}
        pagination={toJS(SchoolListService.pagination)}
        fetching={SchoolListService.fetch.fetching}
        onDelete={SchoolListService.handleRemove}
        onChange={SchoolListService.load}
      />
    );
  }
}

export default observer(SchoolListContainer);
