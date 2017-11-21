import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolClassFileImportService from '../services/SchoolClassFileImportService';
import SchoolClassFileImport from './SchoolClassFileImport';

class SchoolClassFileImportContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    SchoolClassFileImportService.init(this.props.schoolId);
  }

  render() {
    return (
      <SchoolClassFileImport
        label="Import XLSX file"
        onChange={SchoolClassFileImportService.handleUpload}
        disabled={SchoolClassFileImportService.submit.fetching}
      />
    );
  }
}

export default observer(SchoolClassFileImportContainer);
