import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Separator from '../../../core/layout/Separator';
import Title from '../../../core/content/Title';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import MasteryTestListItemsContainer from './MasteryTestListItemsContainer';
import ItemFormContainer from '../../item/components/ItemFormContainer';

class MasteryTestItemsScene extends Component {

  static propTypes = {
    masteryTestId: PropTypes.string,
    order: PropTypes.number.isRequired,

  }

  static defaultProps = {

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
      editingItemId: itemId,
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Column lgSize={10}>
            <Title>
              {this.state.actualScene === 'LIST' ? 'Mastery Test items' : 'New Mastery Test item'}
            </Title>
          </Column>
          <Column lgSize={2}>
            <div style={{ textAlign: 'right' }}>
              {this.state.actualScene === 'LIST' && (
                <Button
                  primary
                  icon="add"
                  onClick={() => this.handleChangeToForm()}
                  label="Add new mastery test item"
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
          <MasteryTestListItemsContainer masteryTestId={this.props.masteryTestId} />
        ) : (
          <ItemFormContainer
            itemsTypeUrl={`/item-types`}
            endpointUrl={`/mastery-tests/${this.props.masteryTestId}/items`}
            order={this.props.order}
            showPostPhrase={false}
          />
        )}
      </div>
    );
  }
}

export default MasteryTestItemsScene;
