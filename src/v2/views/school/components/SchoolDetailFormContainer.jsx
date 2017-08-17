import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolDetailForm from './SchoolDetailForm';
import SchoolDetailFormService from '../services/SchoolDetailFormService';

class SchoolDetailFormContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string,
  }

  static defaultProps = {
    schoolId: null,
  }

  componentWillMount() {
    SchoolDetailFormService.handleLoad(this.props.schoolId);
  }

  render() {
    return (
      <SchoolDetailForm
        values={SchoolDetailFormService.form.getValues()}
      />
    );
  }
}

export default observer(SchoolDetailFormContainer);
