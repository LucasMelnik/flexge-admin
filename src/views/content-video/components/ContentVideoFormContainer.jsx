import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ContentVideoForm from './ContentVideoForm';
import ContentVideoFormService from '../services/ContentVideoFormService';

class ContentVideoFormContainer extends Component {

  static propTypes = {
    contentVideoId: PropTypes.string,
  };

  static defaultProps = {
    contentVideoId: null,
  };

  contentVideoFormService = new ContentVideoFormService();

  componentWillMount() {
    this.contentVideoFormService.handleLoad(this.props.contentVideoId);
  }

  render() {
    return (
      <ContentVideoForm
        onSubmit={this.contentVideoFormService.handleSubmit}
        onChange={this.contentVideoFormService.form.setValue}
        onReset={this.contentVideoFormService.form.reset}
        values={this.contentVideoFormService.form.getValues()}
        errors={this.contentVideoFormService.form.errors}
        submitting={this.contentVideoFormService.submit.fetching}
        isDirty={this.contentVideoFormService.form.isDirty}
      />
    );
  }
}

export default observer(ContentVideoFormContainer);
