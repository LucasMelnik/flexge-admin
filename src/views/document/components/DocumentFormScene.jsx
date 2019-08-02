import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import DocumentFormContainer from './DocumentFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const DocumentFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.documentId ? 'Edit Document' : 'Create Document'}`,
        },
      ]}
    />
    <Card
      title={props.params.documentId ? 'Edit Document' : 'Create Document'}
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <DocumentFormContainer documentId={props.params.documentId} />
    </Card>
  </div>
);

DocumentFormScene.propTypes = {
  params: PropTypes.shape({
    documentId: PropTypes.string,
  }),
};

DocumentFormScene.defaultProps = {
  params: null,
};

export default DocumentFormScene;
