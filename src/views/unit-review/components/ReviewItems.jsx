import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Separator from '../../../core/layout/Separator';
import Title from '../../../core/content/Title';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import UnitItemListContainer from '../../module/components/unit/unit-item/UnitItemListContainer';
import UnitItemsAccordionContainer from './UnitItemsAccordionContainer';
import ReviewItemFormContainer from './ReviewItemFormContainer';

class ReviewItems extends Component {

  static propTypes = {
    unitId: PropTypes.string,
    moduleId: PropTypes.string,
    reviewId: PropTypes.string,
    status: PropTypes.string.isRequired,
    review: PropTypes.shape({
      id: PropTypes.string,
      createdBy: PropTypes.string,
    }),
  }

  static defaultProps = {
    unitId: null,
    moduleId: null,
    reviewId: null,
    review: {},
  };

  state = {
    actualScene: 'LIST',
    editingItemId: null,
  }

  handleChangeToForm = () => {
    this.setState({
      actualScene: 'FORM',
      editingItemId: null,
    });
  };

  handleChangeToList = () => {
    this.setState({
      actualScene: 'LIST',
      editingItemId: null,
    });
  };

  handleChangeToEdit = (itemId) => {
    this.setState({
      actualScene: 'FORM',
      editingItemId: itemId
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
              {this.state.actualScene === 'LIST' && (this.props.status !== 'PENDING' || this.props.statusFormat === 'NOT_APPROVED') && (
                <Button
                  primary
                  onClick={() => this.handleChangeToForm()}
                  label="Add new item"
                />
              )}
              {this.state.actualScene === 'FORM' && (
                <Button
                  icon="keyboard_backspace"
                  label="back"
                  onClick={() => this.handleChangeToList()}
                />
              )}
            </div>
          </Column>
        </Row>
        <Separator size="xs" />
        {this.state.actualScene === 'LIST' ? (
          <div>
            {((this.props.status === 'PENDING' && this.props.statusFormat !== 'NOT_APPROVED') || localStorage.role === 'ADMIN') ? (
              <UnitItemsAccordionContainer
                moduleId={this.props.moduleId}
                unitId={this.props.unitId}
              />
            ) : (
              <UnitItemListContainer
                unitId={this.props.unitId}
                moduleId={this.props.moduleId}
                status={this.props.status}
                onSelect={row => this.handleChangeToEdit(row.item.id)}
              />
            )}
          </div>
        ) : (
          <ReviewItemFormContainer
            itemId={this.state.editingItemId}
            unitId={this.props.unitId}
            moduleId={this.props.moduleId}
            reviewId={this.props.review.id}
            backToList={this.handleChangeToList}
          />
        )}
      </div>
    );
  }
}

export default ReviewItems;
