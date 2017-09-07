import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Table from '../../../core/form/Table';
import AudioPreview from '../../../core/layout/AudioPreview';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import IconButton from '../../../core/form/IconButton';
import Separator from '../../../core/layout/Separator';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';

const AudioMessageForm = props => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <h4>{props.title}</h4>
      {!props.showForm && (
        <Button
          label="New Message"
          icon="fa-plus"
          onClick={props.onNew}
        />
      )}
    </div>
    {props.showForm && (
      <Row>
        <Column lgSize={9} mdSize={9}>
          <TextInput
            label="Text"
            value={get(props.values, 'text', '')}
            onChange={value => props.onChange('text', value)}
            description={get(props.errors, 'text', null)}
            fieldValidation={get(props.errors, 'text', null) && 'error'}
          />
        </Column>
        <Column lgSize={3} mdSize={3}>
          <div style={{ padding: '32px 0px 0px' }}>
            <Button
              icon="fa fa-check"
              type="primary"
              label="Save"
              onClick={props.onSave}
            />
            {' '}
            <Button
              icon="fa fa-ban"
              label="Discard"
              onClick={props.onDiscard}
            />
          </div>
        </Column>
      </Row>
    )}
    <Separator />
    <Table
      columns={[
        {
          label: 'Text',
          path: 'text',
          isKey: true,
        },
        {
          label: 'Audio',
          path: 'path',
          width: '100px',
          render: (cell) => {
            if (cell && cell.length) {
              return (
                <AudioPreview src={cell} />
              );
            }
            return 'No audio';
          },
        },
        {
          label: 'Actions',
          path: 'action',
          width: '120',
          render: (cell, row) => {
            return (
              <div>
                <IconButton
                  icon="fa-trash"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <IconButton
                  icon="fa-edit"
                  onClick={() => props.onEdit(row)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.messages}
    />
  </div>
);

AudioMessageForm.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showForm: PropTypes.bool.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNew: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default AudioMessageForm;
