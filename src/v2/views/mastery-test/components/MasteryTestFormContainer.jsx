import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MasteryTestForm from './MasteryTestForm';
import MasteryTestFormService from '../services/MasteryTestFormService';
import MasteryTestListItemsService from '../services/MasteryTestListItemsService';

class MasteryTestFormContainer extends Component {

  static propTypes = {
    masteryTestId: PropTypes.string,
    moduleId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    masteryTestId: null,
  };

  componentWillMount() {
    MasteryTestFormService.handleLoad(this.props.moduleId, this.props.masteryTestId);
  }

  sumDeadlineTime = () => {
    const totalSeconds = MasteryTestListItemsService.items.reduce((total, current) => total + current.item.time, 0);
    const totalSecondsWithBonus = (totalSeconds + (totalSeconds * 0.35));
    const deadlineMinutes = totalSecondsWithBonus / 60;

    let deadlineRounded = Math.round(deadlineMinutes);
    if (deadlineRounded < deadlineMinutes) {
      deadlineRounded += 0.5;
    }

    return deadlineRounded * 60;
  };

  render() {
    return (
      <MasteryTestForm
        deadlineTime={this.sumDeadlineTime()}
        onSubmit={MasteryTestFormService.handleSubmit}
        onChange={MasteryTestFormService.form.setValue}
        onReset={MasteryTestFormService.form.reset}
        values={MasteryTestFormService.form.getValues()}
        errors={MasteryTestFormService.form.errors}
        submitting={MasteryTestFormService.submit.fetching}
        error={MasteryTestFormService.submit.error}
        isDirty={MasteryTestFormService.form.isDirty}
      />
    );
  }
}

export default observer(MasteryTestFormContainer);
