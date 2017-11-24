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

  componentWillMount() {
    AchievementFormService.handleLoad(this.props.achievementId);
  }

  render() {
    return (
      <AchievementForm
        onSubmit={AchievementFormService.handleSubmit}
        onChange={AchievementFormService.form.setValue}
        onReset={AchievementFormService.form.reset}
        values={AchievementFormService.form.getValues()}
        errors={AchievementFormService.form.errors}
        submitting={AchievementFormService.fetch.fetching}
        isDirty={AchievementFormService.form.isDirty}
      />
    );
  }
}

export default observer(AchievementFormContainer);
