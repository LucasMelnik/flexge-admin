import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlicesToRemove from './SlicesToRemove';

export default class SlicesToRemoveContainer extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  state = { slices: [], removedSlices: [] };

  componentWillReceiveProps(nextProps) {
    if (nextProps.text.length > 0) {
      this.setState({
        slices: nextProps.text.split(' '),
      });
    }
  }

  handleRemoveSlice = (index) => {
    const updatedRemovedSlice = [
      ...this.state.removedSlices,
      index,
    ];

    this.setState({
      removedSlices: updatedRemovedSlice,
    });
    this.props.onChange(updatedRemovedSlice);
  }

  handleShowSlice = (index) => {
    const updatedRemovedSlice = this.state.removedSlices.filter(removedIndex => removedIndex !== index);
      this.setState({
      removedSlices: updatedRemovedSlice,
    });
    this.props.onChange(updatedRemovedSlice);
  }

  render() {
    return (
      <SlicesToRemove
        onRemoveSlice={this.handleRemoveSlice}
        onShowSlice={this.handleShowSlice}
        removedSlices={this.state.removedSlices}
        slices={this.state.slices}
        text={this.props.text}
      />
    )
  }
}