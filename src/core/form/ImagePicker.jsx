import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, Modal } from 'antd';
import Cropper from 'react-cropper';
import '../../../node_modules/cropperjs/dist/cropper.css';
import Button from './Button';
import Avatar from '../layout/Avatar';
import Separator from '../layout/Separator';

export default class ImagePicker extends Component {
  static propTypes = {
    src: PropTypes.string,
    onConfirmChanges: PropTypes.func.isRequired,
  };

  static defaultProps = {
    src: null,
  };

  state = {
    imageToCrop: null,
    loading: false,
  };

  handleChange = (event) => {
    if (event.target && event.target.files.length > 0) {
      this.setState({ loading: true });
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.setState({
          imageToCrop: loadEvent.target.result,
          loading: false,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  handleCancelChanges = () => {
    this.setState({
      imageToCrop: null,
      loading: false,
    });
  };

  handleConfirmChanges = () => {
    this.refs.cropper.getCroppedCanvas({
      width: 120,
      height: 120,
      imageSmoothingQuality: 'medium',
    }).toBlob((blob) => {
      this.props.onConfirmChanges(blob);
      this.setState({
        imageToCrop: null,
        loading: false,
      });
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="Dialog With Actions"
          visible={!!this.state.imageToCrop}
          footer={(
            <div>
              <Button
                label="Confirm Change"
                onClick={this.handleConfirmChanges}
              />
              &ensp;
              <Button
                label="Cancel"
                onClick={this.handleCancelChanges}
              />
            </div>
          )}
        >
          <Cropper
            ref="cropper"
            src={this.state.imageToCrop}
            style={{
              maxHeight: 300,
            }}
            guides={false}
            dragMode="move"
            crop={this.crop}
            aspectRatio={1 / 1}
            background={false}
            viewMode={2}
            minCropBoxWidth={40}
            minCropBoxHeight={40}
          />
        </Modal>
        {this.state.loading && (
          <Spin />
        )}
        {!this.state.loading && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              size="lg"
              src={this.props.src}
            />
            <Separator size="xs" />
            <Button
              label="Alterar Avatar"
              onClick={() => this.fileInput.click()}
            />
            <input
              accept=".png, .jpeg, .jpg"
              onChange={this.handleChange}
              ref={(input) => { this.fileInput = input; }}
              type="file"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 0,
                height: 0,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
