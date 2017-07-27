import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Separator from '../../../core/layout/Separator';
import Title from '../../../core/content/Title';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import UnitItemListContainer from '../../module/components/unit/unit-item/UnitItemListContainer';
import ReviewItemFormContainer from './ReviewItemFormContainer';

class ReviewItems extends Component {

  static propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    moduleId: PropTypes.string,
    review: PropTypes.shape({
      id: PropTypes.string,
      createdBy: PropTypes.string,
    }),
  };

  static defaultProps = {
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
      <div>
        <Row>
          <Column lgSize={10}>
            <Title>
              {this.state.actualScene === 'LIST' ? 'Unit items' : 'New item'}
            </Title>
          </Column>
          <Column lgSize={2}>
            <div style={{ textAlign: 'right' }}>
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
          </Column>
        </Row>
        <Separator size="xs" />
        {this.state.actualScene === 'LIST' ? (
          <UnitItemListContainer
            disabled={((this.props.review.status === 'PENDING' && this.props.review.statusFormat !== 'NOT_APPROVED') || localStorage.role === 'ADMIN')}
            unit={this.props.unit}
          />
        ) : (
          <ReviewItemFormContainer
            unit={this.props.unit}
            backToList={this.handleChangeToList}
          />
        )}
      </div>
    );
  }
}

export default ReviewItems;
