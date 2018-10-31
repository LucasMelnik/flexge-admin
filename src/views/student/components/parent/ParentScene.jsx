import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../core/layout/Card';
import Button from '../../../../core/form/Button';
import Separator from '../../../../core/layout/Separator';
import ParentsListContainer from './ParentListContainer';
import ParentFormContainer from './ParentFormContainer';
import ParentLinkFormContainer from './ParentLinkFormContainer';

export default class ParentScene extends React.Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  state = {
    currentScene: 'LIST',
    currentParentId: null,
  };

  handleBack = () => {
    this.setState({
      currentScene: 'LIST',
      currentParentId: null,
    });
  };

  handleNew = () => {
    this.setState({
      currentScene: 'FORM',
      currentParentId: null,
    });
  };

  handleEdit = (parent) => {
    this.setState({
      currentScene: 'FORM',
      currentParentId: parent.id,
    });
  };

  render() {
    return (
      <Card
        title="Parents"
        actions={
          <div>
            {this.state.currentScene === 'LIST' && (
              <Button
                type="primary"
                label="New Parent"
                icon="plus"
                onClick={this.handleNew}
              />
            )}
            {this.state.currentScene === 'FORM' && (
              <Button
                icon="arrow-left"
                label="Back"
                type="default"
                onClick={this.handleBack}
              />
            )}
          </div>
        }
      >
        {this.state.currentScene === 'LIST' && (
          <div>
            <ParentLinkFormContainer
              studentId={this.props.studentId}
            />
            <Separator size="sm" />
            <ParentsListContainer
              studentId={this.props.studentId}
              onEdit={this.handleEdit}
            />
          </div>
        )}
        {this.state.currentScene === 'FORM' && (
          <ParentFormContainer
            studentId={this.props.studentId}
            parentId={this.state.currentParentId}
            onSuccess={this.handleBack}
          />
        )}
      </Card>
    );
  }
}
