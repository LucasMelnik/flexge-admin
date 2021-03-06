import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import SlicesInput from './SlicesInput';

export default class SlicesInputContainer extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSplit: PropTypes.func,
    text: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.number,
      text: PropTypes.string,
      correct: PropTypes.bool,
    })),
    maxRemovesAllowed: PropTypes.number,
    errorText: PropTypes.string,
    sequenceRemove: PropTypes.bool,
    allowLinkSlices: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    maxRemovesAllowed: null,
    errorText: null,
    value: [],
    sequenceRemove: false,
    allowLinkSlices: false,
    disabled: false,
    onSplit: text => text.trim().split(' ')
  };

  state = { slices: [], removedSlices: [] };

  componentWillMount() {
    if (this.props.text.length > 0) {
      this.setState({
        slices: this.props.onSplit(this.props.text),
        removedSlices: this.props.value,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text.length > 0) {
      this.setState({
        slices: nextProps.onSplit(nextProps.text),
      });
    }
    if (nextProps.value) {
      this.setState({
        removedSlices: nextProps.value,
      });
    }
  }

  handleRemoveSlice = (index) => {
    let updatedRemovedSlice = sortBy([
      ...this.state.removedSlices,
      {
        index,
        id: new Date().toISOString(),
        text: this.state.slices[index],
        correct: true,
      },
    ], 'index');

    if (this.props.sequenceRemove) {
      updatedRemovedSlice = updatedRemovedSlice.map((slice) => {
        return {
          ...slice,
          linkTo: slice.index + 1,
        };
      });
    }

    this.setState({
      removedSlices: updatedRemovedSlice,
    }, () => {
      this.props.onChange(this.state.removedSlices);
    });
  };

  handleShowSlice = (index) => {
    const updatedRemovedSlice = this.state.removedSlices.filter(slice => slice.index !== index);
    this.setState({
      removedSlices: updatedRemovedSlice,
    }, () => {
      this.props.onChange(this.state.removedSlices);
    });
  };

  handleLinkSlice = (index) => {
    const updatedRemovedSlice = this.state.removedSlices.map((slice) => {
      if (slice.index === index) {
        return {
          ...slice,
          linkTo: index + 1,
        };
      }
      return slice;
    });
    this.setState({
      removedSlices: updatedRemovedSlice,
    }, () => {
      this.props.onChange(this.state.removedSlices);
    });
  };

  render() {
    return (
      <SlicesInput
        onRemoveSlice={this.handleRemoveSlice}
        onShowSlice={this.handleShowSlice}
        onLinkSlice={this.handleLinkSlice}
        value={this.state.removedSlices.filter(slice => slice.hasOwnProperty('index'))}
        texts={this.state.slices}
        disableRemove={this.state.removedSlices.filter(slice => slice.hasOwnProperty('index')).length === this.props.maxRemovesAllowed}
        errorText={this.props.errorText}
        sequenceRemove={this.props.sequenceRemove}
        allowLink={this.props.allowLinkSlices}
        disabled={this.props.disabled}
      />
    );
  }
}
