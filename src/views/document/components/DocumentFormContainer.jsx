import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DocumentForm from './DocumentForm';
import DocumentFormService from '../services/DocumentFormService';

class DocumentFormContainer extends Component {

  static propTypes = {
    documentId: PropTypes.string,
  };

  static defaultProps = {
    documentId: null,
  };

  documentFormService = new DocumentFormService();
  componentWillMount() {
    this.documentFormService.handleLoad(this.props.documentId);
  }

  render() {
    return (
      <DocumentForm
        onSubmit={this.documentFormService.handleSubmit}
        onChange={this.documentFormService.form.setValue}
        onReset={this.documentFormService.form.reset}
        values={this.documentFormService.form.getValues()}
        errors={this.documentFormService.form.errors}
        submitting={this.documentFormService.submit.fetching}
        isDirty={this.documentFormService.form.isDirty}
      />
    );
  }
}

export default observer(DocumentFormContainer);
