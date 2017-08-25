import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../../core/form/IconButton';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
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
        <div style={{ height: 360 }} />
        <div
          style={{
            position: 'fixed',
            zIndex: 3,
            bottom: 0,
            left: 0,
            right: 0,
            height: this.state.expanded ? '89%' : 360,
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
            <Row>
              <Column lgSize={6} mdSize={6}>
                <ContentReviewFormContainer
                  expanded={this.state.expanded}
                  masteryTestId={this.props.masteryTestId}
                  moduleId={this.props.moduleId}
                />
              </Column>
              <Column lgSize={6} mdSize={6}>
                <FormatReviewFormContainer
                  expanded={this.state.expanded}
                  masteryTestId={this.props.masteryTestId}
                  moduleId={this.props.moduleId}
                />
              </Column>
            </Row>
          </Card>
        </div>
      </div>
    );
  }
}
