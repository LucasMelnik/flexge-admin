import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DistributorManagerList from './DistributorManagerList';
import DistributorManagerListService from '../services/DistributorManagerListService';

class DistributorManagerListContainer extends Component {

  static propTypes = {
    distributorId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    DistributorManagerListService.load(this.props.distributorId);
  }

  render() {
    return (
      <DistributorManagerList
        managers={toJS(DistributorManagerListService.managers)}
        fetching={DistributorManagerListService.fetch.fetching}
      />
    );
  }
}

export default observer(DistributorManagerListContainer);
