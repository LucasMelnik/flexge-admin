import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class DownloadSampleFile extends React.Component {

  static propTypes = {
    fileName: PropTypes.string.isRequired,
    fileLocation: PropTypes.string.isRequired,
  };

  handleDownload = () => {
    const link = document.createElement('a');
    link.href = this.props.fileLocation;

    link.download = this.props.fileName;
    link.click();
    setTimeout(() => window.URL.revokeObjectURL(this.props.fileLocation), 500);
  };

  render() {
    return (
      <Button
        label="Download sample file"
        icon="file-excel"
        onClick={this.handleDownload}
      />
    );
  }
};

