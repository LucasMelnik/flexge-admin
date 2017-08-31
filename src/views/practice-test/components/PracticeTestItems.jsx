import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../core/form/Button';
import PracticeTestListItemsContainer from './PracticeTestListItemsContainer';
//import PracticeTestItemFormContainer from './PracticeTestItemFormContainer';
import Card from '../../../core/layout/Card';
import PracticeTestItemFormContainer from './PracticeTestItemFormContainer';

class PracticeTestItems extends Component {

  static propTypes = {
    practiceTestId: PropTypes.string.isRequired,
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
        title={this.state.actualScene === 'LIST' ? 'Practice Test items' : 'New Practice Test item'}
        actions={
          <div>
            {this.state.actualScene === 'LIST' && (
              <Button
                icon="fa-plus"
                onClick={this.handleChangeToForm}
                label="Add new practice test item"
              />
            )}
            {this.state.actualScene === 'FORM' && (
              <Button
                icon="fa-arrow-left"
                label="Back to Items"
                onClick={this.handleChangeToList}
              />
            )}
          </div>
        }
      >
        {this.state.actualScene === 'LIST' ? (
          <PracticeTestListItemsContainer practiceTestId={this.props.practiceTestId} />
        ) : (
          <PracticeTestItemFormContainer
            endpointUrl={`/practice-tests/${this.props.practiceTestId}/items`}
            onSaveSuccess={this.handleChangeToList}
          />
        )}
      </Card>
    );
  }
}

export default PracticeTestItems;
