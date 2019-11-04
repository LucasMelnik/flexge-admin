import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import ContentReviewFormContainer from './ContentReviewFormContainer';
import FormatReviewFormContainer from './FormatReviewFormContainer';

export default class ReviewFormControlBar extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    masteryTestId: PropTypes.string.isRequired,
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
        <div style={{ height: 60 }} />
        <div
          style={{
            position: 'fixed',
            backgroundColor: '#fff',
            borderTop: '1px solid #cecece',
            zIndex: 3,
            bottom: 0,
            left: 0,
            right: 0,
            height: this.state.expanded ? 360 : 30,
            transition: 'all 1s',
            padding: '20px 10px 10px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 15,
              top: -15,
            }}
          >
            <Button
              type="primary"
              icon={this.state.expanded ? 'down-square-o' : 'up-square-o'}
              onClick={() => this.handleExpandOrRetractComment()}
            />
          </div>
          <Row>
            <Column size={6}>
              <ContentReviewFormContainer
                masteryTestId={this.props.masteryTestId}
                moduleId={this.props.moduleId}
              />
            </Column>
            <Column size={6}>
              <FormatReviewFormContainer
                masteryTestId={this.props.masteryTestId}
                moduleId={this.props.moduleId}
              />
            </Column>
          </Row>
        </div>
      </div>
    );
  }
}
