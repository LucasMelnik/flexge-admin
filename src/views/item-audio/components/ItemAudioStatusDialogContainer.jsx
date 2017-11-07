import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Dialog from '../../../core/layout/Dialog';
import Button from '../../../core/form/Button';
import TextEditor from '../../../core/form/TextEditor';
import ItemAudioStatusService from '../services/ItemAudioStatusService';

class ItemAudioStatusDialogContainer extends Component {

  render() {
    return (
      <Dialog
        title={`${ItemAudioStatusService.status === 'APPROVED' ? 'Approve' : 'Disapprove'} Audio`}
        actions={[
          <Button
            key="confirmButton"
            type="primary"
            label={ItemAudioStatusService.status === 'APPROVED' ? 'Approve' : 'Disapprove'}
            onClick={ItemAudioStatusService.handleConfirm}
          />,
          <Button
            key="discardButton"
            type="default"
            label="Cancel"
            onClick={ItemAudioStatusService.handleCancel}
          />,
        ]}
        isOpen={ItemAudioStatusService.isOpen}
      >
        <TextEditor
          style={{
            height: 160,
            paddingBottom: 60,
          }}
          placeholder="Place a comment"
          isRequired
          readOnly={ItemAudioStatusService.submit.fetching}
          value={ItemAudioStatusService.form.getValue('commentsAudios')}
          onChange={value => ItemAudioStatusService.form.setValue('commentsAudios', value)}
        />
      </Dialog>
    );
  }
}

export default observer(ItemAudioStatusDialogContainer);
