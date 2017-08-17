import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolClassDetailForm from './SchoolClassDetailForm';
import SchoolClassDetailFormService from '../services/SchoolClassDetailFormService';

class SchoolClassDetailFormContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  }

  static defaultProps = {
    schoolId: null,
    classId: null,
  }

  componentWillMount() {
    SchoolClassDetailFormService.handleLoad(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <SchoolClassDetailForm
        values={SchoolClassDetailFormService.form.getValues()}
        schoolId={this.props.schoolId}
      />
    )
  }
}

export default observer(SchoolClassDetailFormContainer);
