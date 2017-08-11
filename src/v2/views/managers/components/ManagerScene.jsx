import React from 'react';
import PropTypes from 'prop-types';
import ManagerListContainer from './ManagerListContainer';
import ManagerFormContainer from './ManagerFormContainer';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';

const ManagerScene = props => (
  <Card
    title={props.title}
    actions={
      <div>
        {props.actualScene === 'LIST' && (
          <Button
            label="New Manager"
            icon="fa-plus"
            onClick={() => props.changeToForm()}
          />
        )}
        {props.actualScene === 'FORM' && (
          <Button
            label="Back to Managers"
            icon="fa-arrow-back"
            onClick={() => props.changeToList()}
          />
        )}
      </div>
    }
  >
    {props.actualScene === 'LIST' && (
      <ManagerListContainer
        onEdit={props.onEdit}
      />
    )}
    {props.actualScene === 'FORM' && (
      <ManagerFormContainer />
    )}
  </Card>
);

ManagerScene.propTypes = {
  title: PropTypes.string.isRequired,
  actualScene: PropTypes.string.isRequired,
  changeToList: PropTypes.func.isRequired,
  changeToForm: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ManagerScene;
