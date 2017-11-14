import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations/index';
import AchievementIconForm from './AchievementIconForm';

class AchievementIconFormContainer extends Component {

  static propTypes = {
    icons: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    icons: [],
  };

  formService = new FormService();

  componentDidMount() {
    this.formService.validations = {
      icon: [isRequired],
      position: [isRequired],
    };
    this.formService.setInitialValues({});
  }

  handleEditMessage = (icon) => {
    this.formService.setInitialValues(icon);
    this.formService.reset();
  };

  handleSaveMessage = () => {
    if (this.formService.errors) {
      return;
    }

    let icons = [];
    const iconId = this.formService.getValue('id');

    if (iconId) {
      icons = this.props.icons.map((icon) => {
        if (icon.id === iconId) {
          return this.formService.getValues();
        }
        return icon;
      });
    } else {
      icons = [
        ...this.props.icons,
        {
          ...this.formService.getValues(),
        },
      ];
    }

    this.props.onChange(icons);

    this.formService.setInitialValues({});
    this.formService.reset();
  };

  handleDeleteMessage = (messageToRemove) => {
    const icons = this.props.icons.filter(message => message.position !== messageToRemove.position);
    this.props.onChange(icons);
  };

  handleDiscard = () => {
    this.formService.setInitialValues({});
    this.formService.reset();
  };

  render() {
    return (
      <AchievementIconForm
        icons={this.props.icons}
        onReset={this.handleDiscard}
        onEdit={this.handleEditMessage}
        onSave={this.handleSaveMessage}
        onDelete={this.handleDeleteMessage}
        values={this.formService.getValues()}
        onChange={this.formService.setValue}
        errors={this.formService.errors}
        isDirty={this.formService.isDirty}
      />
    );
  }
}

export default observer(AchievementIconFormContainer);
