import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolClassFileImportService from '../services/SchoolClassFileImportService';
import SchoolClassFileImport from './SchoolClassFileImport';

class SchoolClassFileImportContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
  };

  schoolClassFileImportService = new SchoolClassFileImportService();
  componentWillMount() {
    this.schoolClassFileImportService.init(this.props.schoolId);
  }

  render() {
    return (
      <SchoolClassFileImport
        label="Import XLSX file"
        onChange={this.schoolClassFileImportService.handleUpload}
        disabled={this.schoolClassFileImportService.submit.fetching}
      />
    );
  }
}

export default observer(SchoolClassFileImportContainer);
