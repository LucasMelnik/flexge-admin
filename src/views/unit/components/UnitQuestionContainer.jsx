import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import SubTitle from '../../../core/content/SubTitle';
import Modal from "../../../core/layout/Modal";
import QuestionListService from "../../question/services/QuestionListService";
import QuestionFormService from "../../question/services/QuestionFormService";
import QuestionListContainer from "../../question/components/QuestionListContainer";
import QuestionListPaginationContainer from "../../question/components/QuestionListPaginationContainer";
import Separator from "../../../core/layout/Separator";
import FloatActionButton from "../../../core/form/FloatActionButton";
import QuestionFormContainer from "../../question/components/QuestionFormContainer";

export default class UnitQuestionContainer extends Component {

  static propTypes = {
    unitId: PropTypes.string.isRequired,
  };

  state = { modalFormOpen: false };

  componentWillMount() {
    QuestionListService.init(this.props.unitId, this.handleSelect);
    QuestionFormService.init(this.props.unitId, () => {
      this.toggleModal();
      QuestionListService.load();
    });
  }

  toggleModal = () => {
    this.setState({
      modalFormOpen: !this.state.modalFormOpen,
    });
  };

  handleSelect = (question) => {
    QuestionFormService.handleLoad(question.id);
    this.toggleModal();
  };

  handleAddClick = () => {
    QuestionFormService.handleLoad();
    this.toggleModal();
  };

  render() {
    return (
      <div>
        <InlineBlock>
          <SubTitle>Questions</SubTitle>
        </InlineBlock>
        <FloatActionButton
          secondary
          icon="add"
          style={{ position: 'relative',
            float: 'right',
            top: 20,
            right: 20,
          }}
          onClick={() => this.handleAddClick()}
        />
        <QuestionListContainer />
        <Separator size="sm" />
        <QuestionListPaginationContainer />
        <Modal
          title="Question"
          isOpen={this.state.modalFormOpen}
          width="90%"
        >
          <QuestionFormContainer />
        </Modal>
      </div>
    );
  }
}