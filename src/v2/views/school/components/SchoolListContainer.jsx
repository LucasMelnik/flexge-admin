import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolList from './SchoolList';
import SchoolListService from '../services/SchoolListService';

class SchoolListContainer extends Component {

  static propTypes = {
    companyId: PropTypes.string,
  }

  static defaultProps = {
    companyId: PropTypes.string,
  }

  componentDidMount() {
    SchoolListService.init(this.props.companyId);
  }

  render() {
    return (
      <SchoolList
        companyId={this.props.companyId}
        schools={toJS(SchoolListService.schools)}
        fetching={SchoolListService.fetch.fetching}
        onDelete={SchoolListService.handleRemove}
      />
    );
  }
}

export default observer(SchoolListContainer);
