import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Table from '../../../core/form/Table';
import AudioPreview from '../../../core/layout/AudioPreview';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FileInput from '../../../core/form/FileInput';

const AudioMessageForm = props => (
  <div
    style={{
      marginBottom: 20,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: props.showForm ? 0 : 20,
      }}
    >
      <h3>{props.title}</h3>
      {!props.showForm && (
        <Button
          type="primary"
          label="New Message"
          icon="plus"
          onClick={props.onNew}
        />
      )}
    </div>
    {props.showForm && (
      <Row>
        <Column size={6}>
          <TextInput
            label="Text"
            value={get(props.values, 'text', '')}
            onChange={value => props.onChange('text', value)}
            description={get(props.errors, 'text', null)}
            fieldValidation={get(props.errors, 'text', null) && 'error'}
          />
        </Column>
        <Column size={3}>
          <FileInput
            value={get(props.values, 'path', '')}
            onChange={value => props.onChange('path', value)}
            label="Add audio"
            accept="audio"
          />
        </Column>
        <Column size={3}>
          <div style={{ marginTop: 32 }}>
            <Button
              icon="check"
              type="primary"
              label="Save"
              onClick={props.onSave}
            />
            {' '}
            <Button
              icon="reload"
              label="Discard"
              onClick={props.onDiscard}
            />
          </div>
        </Column>
      </Row>
    )}
    <Table
      columns={[
        {
          label: 'Text',
          path: 'text',
          sort: true,
        },
        {
          label: 'Audio',
          path: 'path',
          width: '105px',
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
          label: 'Generated Audio',
          path: 'generatedAudio',
          width: '105px',
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
          width: '105px',
          render: (cell, row) => {
            return (
              <div>
                <Button
                  icon="delete"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <Button
                  icon="edit"
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
