import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolList from './SchoolList';
import SchoolListService from '../services/SchoolListService';

class SchoolListContainer extends Component {

  static propTypes = {
    distributorId: PropTypes.string,
    companyId: PropTypes.string,
  };

  static defaultProps = {
    distributorId: null,
    companyId: null,
  };

  componentDidMount() {
    SchoolListService.init(this.props.companyId);
  }

  render() {
    return (
      <SchoolList
        distributorId={this.props.distributorId}
        companyId={this.props.companyId}
        schools={toJS(SchoolListService.schools)}
        fetching={SchoolListService.fetch.fetching}
        onDelete={SchoolListService.handleRemove}
      />
    );
  }
}

export default observer(SchoolListContainer);
