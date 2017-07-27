import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Separator from '../../../core/layout/Separator';
import Title from '../../../core/content/Title';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import MasteryTestListItemsContainer from './MasteryTestListItemsContainer';
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
      <div>
        <Row>
          <Column lgSize={9}>
            <Title>
              {this.state.actualScene === 'LIST' ? 'Mastery Test items' : 'New Mastery Test item'}
            </Title>
          </Column>
          <Column lgSize={3}>
            <div style={{ textAlign: 'right' }}>
              {this.state.actualScene === 'LIST' && (
                <Button
                  primary
                  icon="add"
                  onClick={this.handleChangeToForm}
                  label="Add new mastery test item"
                />
              )}
              {this.state.actualScene === 'FORM' && (
                <Button
                  icon="keyboard_backspace"
                  label="back"
                  onClick={this.handleChangeToList}
                />
              )}
            </div>
          </Column>
        </Row>
        <Separator size="xs" />
        {this.state.actualScene === 'LIST' ? (
          <MasteryTestListItemsContainer masteryTestId={this.props.masteryTestId} />
        ) : (
          <MasteryTestItemFormContainer
            endpointUrl={`/mastery-tests/${this.props.masteryTestId}/items`}
            onSaveSuccess={this.handleChangeToList}
          />
        )}
      </div>
    );
  }
}

export default MasteryTestItems;
