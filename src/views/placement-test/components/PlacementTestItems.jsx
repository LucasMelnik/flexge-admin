import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacementTestItemListContainer from './PlacementTestItemListContainer';
import PlacementTestItemFormContainer from './PlacementTestItemFormContainer';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

export default class PlacementTestItems extends Component {

  static propTypes = {
    placementTestId: PropTypes.string.isRequired,
  };

  state = { actualScene: 'LIST' };

  handleChangeToList = () => {
    this.setState({
      actualScene: 'LIST',
    });
  };

  handleChangeToForm = () => {
    this.setState({
      actualScene: 'FORM',
    });
  };

  render() {
    return (
      <Card
        title={this.state.actualScene === 'LIST' ? 'Grammar Items' : 'Grammar Item Form'}
        actions={this.state.actualScene === 'LIST' ? (
          <Button
            type="primary"
            icon="plus"
            onClick={this.handleChangeToForm}
            label="Add new grammar item"
          />
        ) : (
          <Button
            icon="arrow-left"
            label="Back"
            onClick={this.handleChangeToList}
          />
        )}
      >
        {this.state.actualScene === 'LIST' ? (
          <PlacementTestItemListContainer placementTestId={this.props.placementTestId} />
        ) : (
          <PlacementTestItemFormContainer
            onSaveSuccess={this.handleChangeToList}
            placementTestId={this.props.placementTestId}
          />
        )}
      </Card>
    );
  }
}
