import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import get from 'lodash/get';
import DataImportResultList from './DataImportResultList';
import DataImportService from '../services/DataImportService';

class DataImportResultListContainer extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  render() {
    return (
      <DataImportResultList
        data={toJS(get(DataImportService, this.props.path, []))}
      />
    );
  }
}

export default observer(DataImportResultListContainer);
