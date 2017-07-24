import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MasteryTestForm from './MasteryTestForm';
import MasteryTestFormService from '../services/MasteryTestFormService';

class MasteryTestFormContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (!MasteryTestFormService.form.getValue('module')) {
      MasteryTestFormService.form.setValue('module', nextProps.moduleId);
    }
  }

  render() {
    return (
      <MasteryTestForm
        moduleId={this.props.moduleId}
        onSubmit={MasteryTestFormService.handleSubmit}
        onChange={MasteryTestFormService.form.setValue}
        onReset={MasteryTestFormService.form.reset}
        values={MasteryTestFormService.form.getValues()}
        errors={MasteryTestFormService.form.errors}
        submitting={MasteryTestFormService.fetch.fetching}
        error={MasteryTestFormService.fetch.error}
        isDirty={MasteryTestFormService.form.isDirty}
      />
    );
  }
}

export default observer(MasteryTestFormContainer);
