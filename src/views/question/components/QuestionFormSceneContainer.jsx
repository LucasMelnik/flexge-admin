import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import QuestionFormScene from "./QuestionFormScene";
import QuestionFormService from '../services/QuestionFormService';

class QuestionFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      questionId: PropTypes.string,
    }).isRequired,
  }

  componentWillMount() {
    QuestionFormService.handleLoad(this.props.params.questionId);
  }

  render() {
    return (
      <QuestionFormScene
        questionId={QuestionFormService.questionId}
      />
    );
  }
}

export default observer(QuestionFormSceneContainer);
