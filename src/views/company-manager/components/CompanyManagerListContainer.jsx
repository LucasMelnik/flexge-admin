import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyManagerList from './CompanyManagerList';
import CompanyManagerListService from '../services/CompanyManagerListService';

class CompanyManagerListContainer extends Component {

  static propTypes = {
    companyId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    CompanyManagerListService.load(this.props.companyId);
  }

  render() {
    return (
      <CompanyManagerList
        managers={toJS(CompanyManagerListService.managers)}
        fetching={CompanyManagerListService.fetch.fetching}
      />
    );
  }
}

export default observer(CompanyManagerListContainer);
