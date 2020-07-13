import React from 'react';
import PropTypes from 'prop-types';
import DownloadContentService from '../services/DownloadContentService';
import Button from '../../../core/form/Button';

export default class DownloadContent extends React.Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    unitId: PropTypes.string.isRequired,
  };

  downloadContentService = new DownloadContentService();

  render() {
    return (
      <Button
        label="Download content"
        icon="file-excel"
        onClick={() => this.downloadContentService.handleDownload(this.props.moduleId, this.props.unitId)}
        loading={this.downloadContentService.download.fetching}
      />
    );
  }
};

