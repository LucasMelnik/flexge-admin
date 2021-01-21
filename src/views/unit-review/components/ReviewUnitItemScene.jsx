import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../core/form/Button';
import UnitItemListContainer from '../../module/components/unit/unit-item/UnitItemListContainer';
import ReviewItemFormContainer from './ReviewItemFormContainer';
import Card from '../../../core/layout/Card';
import Async from '../../../core/layout/Async';
import { Roles } from '../../../core/util';

class ReviewUnitItemScene extends Component {

  static propTypes = {
    fetching: PropTypes.bool,
    unit: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    moduleId: PropTypes.string,
    review: PropTypes.shape({
      id: PropTypes.string,
      createdBy: PropTypes.string,
    }),
  };

  static defaultProps = {
    fetching: false,
    moduleId: null,
    review: {},
  };

  state = {
    actualScene: 'LIST',
  };

  handleChangeToForm = () => {
    this.setState({
      actualScene: 'FORM',
    });
  };

  handleChangeToList = () => {
    this.setState({
      actualScene: 'LIST',
    });
  };

  render() {
    return (
      <Card
        title={this.state.actualScene === 'LIST' ? 'Unit items' : 'New item'}
        actions={
          <div>
            {this.state.actualScene === 'LIST' && (this.props.review.status !== 'PENDING' || this.props.review.statusFormat === 'NOT_APPROVED') && (
              <Button
                primary
                onClick={() => this.handleChangeToForm()}
                label="Add new item"
              />
            )}
            {this.state.actualScene === 'FORM' && (
              <Button
                icon="keyboard_backspace"
                label="back to items"
                onClick={() => this.handleChangeToList()}
              />
            )}
          </div>
        }
      >
        <Async fetching={this.props.fetching}>
          {this.state.actualScene === 'LIST' ? (
            <UnitItemListContainer
              disabled={((this.props.review.status === 'PENDING' && this.props.review.statusFormat !== 'NOT_APPROVED') || [Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role))}
              unit={this.props.unit}
            />
          ) : (
            <ReviewItemFormContainer
              unit={this.props.unit}
              backToList={this.handleChangeToList}
            />
          )}
        </Async>
      </Card>
    );
  }
}

export default ReviewUnitItemScene;
