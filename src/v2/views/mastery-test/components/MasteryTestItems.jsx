import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../core/form/Button';
import MasteryTestListItemsContainer from './MasteryTestListItemsContainer';
//import MasteryTestItemFormContainer from './MasteryTestItemFormContainer';
import Card from '../../../core/layout/Card';
import MasteryTestItemFormContainer from './MasteryTestItemFormContainer';

class MasteryTestItems extends Component {

  static propTypes = {
    masteryTestId: PropTypes.string.isRequired,
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
        title={this.state.actualScene === 'LIST' ? 'Mastery Test items' : 'New Mastery Test item'}
        actions={
          <div>
            {this.state.actualScene === 'LIST' && (
              <Button
                icon="fa-plus"
                onClick={this.handleChangeToForm}
                label="Add new mastery test item"
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
          <MasteryTestListItemsContainer masteryTestId={this.props.masteryTestId} />
        ) : (
         <MasteryTestItemFormContainer
            endpointUrl={`/mastery-tests/${this.props.masteryTestId}/items`}
            onSaveSuccess={this.handleChangeToList}
          />
        )}
      </Card>
    );
  }
}

export default MasteryTestItems;
