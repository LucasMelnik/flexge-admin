import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../../core/form/IconButton';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import ReviewFormContainer from './ReviewFormContainer';

export default class ReviewFormControlBar extends Component {

  static propTypes = {
    placementTestId: PropTypes.string.isRequired,
  };

  state = {
    expanded: false,
  };

  handleExpandOrRetractComment = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    return (
      <div>
        <div style={{ height: 300 }} />
        <div
          style={{
            position: 'fixed',
            zIndex: 3,
            bottom: 0,
            left: 0,
            right: 0,
            height: this.state.expanded ? '89%' : 300,
            maxHeight: '89%',
            transition: 'all 1s',
          }}
        >
          <Card>
            <Separator size="xs" />
            <div
              style={{
                position: 'absolute',
                right: 15,
                top: -15,
              }}
            >
              <IconButton
                type="primary"
                icon={this.state.expanded ? 'fa-arrow-down' : 'fa-arrow-up'}
                onClick={() => this.handleExpandOrRetractComment()}
              />
            </div>
            <ReviewFormContainer
              expanded={this.state.expanded}
              placementTestId={this.props.placementTestId}
            />
          </Card>
        </div>
      </div>
    );
  }
}
