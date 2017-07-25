import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubTitle from '../../../core/content/SubTitle';
import Separator from '../../../core/layout/Separator';
import PlacementTestItemListContainer from './PlacementTestItemListContainer';
import PlacementTestItemFormContainer from './PlacementTestItemFormContainer';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Button from '../../../core/form/Button';

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
      <div>
        <Row>
          <Column lgSize={10}>
            <SubTitle>
              {this.state.actualScene === 'LIST' ? 'Placement Test items' : 'New Placement Test item'}
            </SubTitle>
          </Column>
          <Column lgSize={2}>
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
        {this.state.actualScene === 'LIST' & (
          <PlacementTestItemListContainer placementTestId={this.props.placementTestId} />
        )}
        {this.state.actualScene === 'FORM' & (
          <PlacementTestItemFormContainer
            onSaveSuccess={this.handleChangeToList}
            placementTestId={this.props.placementTestId}
          />
        )}
      </div>
    )
  }
}
