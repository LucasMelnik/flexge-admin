import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import LinearProgress from '../../../core/layout/LinearProgress';
import Separator from '../../../core/layout/Separator';
import Dialog from '../../../core/layout/Dialog';

const ContentVideoUploadDialog = props => (
  <Dialog
    title="Video upload progress"
    isOpen={props.isOpen}
  >
    <Row>
      <Column size={12}>
        <LinearProgress
          value={props.values.uploadPercentage || 0}
          color={props.values.uploadPercentage && props.values.uploadPercentage >= 100 ? 'green' : 'blue'}
          showInfo
        />
        <Separator size="lg"/>
      </Column>
    </Row>
  </Dialog>
);

ContentVideoUploadDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  values: PropTypes.object,
};

ContentVideoUploadDialog.defaultProps = {
  values: {},
};

export default ContentVideoUploadDialog;
