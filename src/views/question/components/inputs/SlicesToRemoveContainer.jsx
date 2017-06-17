import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlicesToRemove from './SlicesToRemove';

export default class SlicesToRemoveContainer extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    maxRemovesAllowed: PropTypes.number,
    errorText: PropTypes.string,
    indexesToRemove: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    maxRemovesAllowed: null,
    errorText: null,
    indexesToRemove: [],
  };

  state = { slices: [], removedSlices: [] };

  componentWillMount() {
    if (this.props.text.length > 0) {
      this.setState({
        slices: this.props.text.trim().split(' '),
        removedSlices: this.props.indexesToRemove,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text.length > 0) {
      this.setState({
        slices: nextProps.text.trim().split(' '),
      });
    }
  }

  getSliceTextsRemoved = () => {
    return this.state.slices.reduce((result, text, index) => {
      if (this.state.removedSlices.find(removedIndex => removedIndex === index) !== undefined) {
        result = result.concat([text]);
      }
      return result;
    }, []);
  }

  handleRemoveSlice = (index) => {
    const updatedRemovedSlice = [
      ...this.state.removedSlices,
      index,
    ];

    this.setState({
      removedSlices: updatedRemovedSlice,
    }, () => {
      this.props.onChange(updatedRemovedSlice, this.getSliceTextsRemoved());
    });
  }

  handleShowSlice = (index) => {
    const updatedRemovedSlice = this.state.removedSlices.filter(removedIndex => removedIndex !== index);
      this.setState({
      removedSlices: updatedRemovedSlice,
    }, () => {
      this.props.onChange(updatedRemovedSlice, this.getSliceTextsRemoved());
    });
  }

  render() {
    return (
      <SlicesToRemove
        onRemoveSlice={this.handleRemoveSlice}
        onShowSlice={this.handleShowSlice}
        removedSlices={this.state.removedSlices}
        slices={this.state.slices}
        text={this.props.text}
        disableRemove={this.state.removedSlices.length === this.props.maxRemovesAllowed}
        errorText={this.props.errorText}
      />
    )
  }
}