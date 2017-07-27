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

  render() {
    return (
      <MasteryTestForm
        deadlineTime={MasteryTestListItemsService.items.reduce(
        (total, current) => total + current.item.time, 0)}
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
