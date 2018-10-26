import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ParentForm from './ParentForm';
import ParentFormService from '../../services/ParentFormService';

class ParentFormContainer extends Component {
  static propTypes = {
    parentId: PropTypes.string,
    onSuccess: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    parentId: null,
  };

  parentFormService = new ParentFormService();
  componentWillMount() {
    this.parentFormService.handleLoad(this.props.parentId, this.props.studentId, this.props.onSuccess);
  }

  render() {
    return (
      <ParentForm
        onSubmit={this.parentFormService.handleSubmit}
        onChange={this.parentFormService.form.setValue}
        onReset={this.parentFormService.form.reset}
        values={this.parentFormService.form.getValues()}
        errors={this.parentFormService.form.errors}
        submitting={this.parentFormService.submit.fetching}
        isDirty={this.parentFormService.form.isDirty}
      />
    );
  }
}

export default observer(ParentFormContainer);
