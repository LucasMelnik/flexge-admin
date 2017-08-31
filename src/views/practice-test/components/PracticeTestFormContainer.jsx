import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PracticeTestForm from './PracticeTestForm';
import PracticeTestFormService from '../services/PracticeTestFormService';

class PracticeTestFormContainer extends Component {

  static propTypes = {
    practiceTestId: PropTypes.string,
  };

  static defaultProps = {
    practiceTestId: null,
  };

  componentWillMount() {
    PracticeTestFormService.handleLoad(this.props.practiceTestId);
  }

  render() {
    return (
      <PracticeTestForm
        onSubmit={PracticeTestFormService.handleSubmit}
        onChange={PracticeTestFormService.form.setValue}
        onReset={PracticeTestFormService.form.reset}
        values={PracticeTestFormService.form.getValues()}
        errors={PracticeTestFormService.form.errors}
        submitting={PracticeTestFormService.submit.fetching}
        error={PracticeTestFormService.submit.error}
        isDirty={PracticeTestFormService.form.isDirty}
      />
    );
  }
}

export default observer(PracticeTestFormContainer);
