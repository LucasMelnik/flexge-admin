import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AchievementForm from './AchievementForm';
import AchievementFormService from '../services/AchievementFormService';

class AchievementFormContainer extends Component {

  static propTypes = {
    achievementId: PropTypes.string,
  };

  static defaultProps = {
    achievementId: null,
  };

  achievementFormService = new AchievementFormService();
  componentWillMount() {
    this.achievementFormService.handleLoad(this.props.achievementId);
  }

  render() {
    return (
      <AchievementForm
        onSubmit={this.achievementFormService.handleSubmit}
        onChange={this.achievementFormService.form.setValue}
        onReset={this.achievementFormService.form.reset}
        values={this.achievementFormService.form.getValues()}
        errors={this.achievementFormService.form.errors}
        submitting={this.achievementFormService.fetch.fetching}
        isDirty={this.achievementFormService.form.isDirty}
      />
    );
  }
}

export default observer(AchievementFormContainer);
