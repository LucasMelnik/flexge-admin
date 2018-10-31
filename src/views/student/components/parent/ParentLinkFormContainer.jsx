import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ParentLinkForm from './ParentLinkForm';
import ParentLinkFormService from '../../services/ParentLinkFormService';

class ParentLinkFormContainer extends Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  parentLinkFormService = new ParentLinkFormService();
  componentWillMount() {
    this.parentLinkFormService.handleInit(this.props.studentId);
  }

  render() {
    return (
      <ParentLinkForm
        onSubmit={this.parentLinkFormService.handleSubmit}
        onChange={this.parentLinkFormService.form.setValue}
        values={this.parentLinkFormService.form.getValues()}
        errors={this.parentLinkFormService.form.errors}
        submitting={this.parentLinkFormService.submit.fetching}
        fetchingParents={this.parentLinkFormService.fetchParents.fetching}
        parents={this.parentLinkFormService.parents}
        onParentsSearch={this.parentLinkFormService.loadParents}
      />
    );
  }
}

export default observer(ParentLinkFormContainer);
