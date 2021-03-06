import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observe } from 'mobx';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';
import MasteryTestListItemsContainer from './MasteryTestListItemsContainer';
import MasteryTestItemFormContainer from './MasteryTestItemFormContainer';
import MasteryTestListItemsService from '../services/MasteryTestListItemsService';

class MasteryTestItems extends Component {

  static propTypes = {
    masteryTestId: PropTypes.string.isRequired,
    academicPlanId: PropTypes.string.isRequired,
  };

  state = {
    actualScene: 'LIST',
    totalItems: 0,
  };

  componentDidMount() {
    observe(MasteryTestListItemsService, 'items', () => {
      this.setState({
        totalItems: MasteryTestListItemsService.items.length,
      });
    });
  }

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
        title={this.state.actualScene === 'LIST' ? 'Mastery Test items' : 'New Mastery Test item'}
        actions={
          <div>
            {(this.state.actualScene === 'LIST' && this.state.totalItems < 50) && (
              <Button
                type="primary"
                icon="plus"
                onClick={this.handleChangeToForm}
                label="Add new mastery test item"
              />
            )}
            {this.state.actualScene === 'FORM' && (
              <Button
                icon="arrow-left"
                label="Back to Items"
                onClick={this.handleChangeToList}
              />
            )}
          </div>
        }
      >
        {this.state.actualScene === 'LIST' ? (
          <MasteryTestListItemsContainer masteryTestId={this.props.masteryTestId} />
        ) : (
          <MasteryTestItemFormContainer
            academicPlanId={this.props.academicPlanId}
            endpointUrl={`/mastery-tests/${this.props.masteryTestId}/items`}
            onSaveSuccess={this.handleChangeToList}
          />
        )}
      </Card>
    );
  }
}

export default MasteryTestItems;
