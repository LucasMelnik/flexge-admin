import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from '../../../../core/layout/Separator';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import Button from '../../../../core/form/Button';
import Select from '../../../../core/form/Select';
import FileInput from '../../../../core/form/FileInput';
import Table from '../../../../core/form/Table';
import IconButton from '../../../../core/form/IconButton';
import AudioPreview from '../../../../core/layout/AudioPreview';
import ImagePreview from '../../../../core/layout/ImagePreview';
import ErrorText from '../../../../core/layout/ErrorText';

const AnswersInput = props => (
  <div>
    {!props.disabled && (
      <Row>
        <Column
          lgSize={props.answerType === 'BOTH' ? 7 : 9}
          mdSize={props.answerType === 'BOTH' ? 7 : 9}
        >
          <TextInput
            disabled={props.submitting}
            label={props.label}
            value={get(props.values, 'text', '')}
            onChange={value => props.onChange('text', value)}
            description={get(props.errors, 'text', '')}
            fieldValidation={get(props.errors, 'text', null) && 'error'}
          />
        </Column>
        {props.answerType === 'BOTH' && (
          <Column lgSize={2} mdSize={2}>
          <Select
            disabled={props.submitting}
            label="Is this a Correct answer ?"
            value={get(props.values, 'correct', '')}
            onChange={value => props.onChange('correct', value)}
            options={[
              { value: false, label: 'No' },
              { value: true, label: 'Yes' },
            ]}
          />
          <ColumnSeparator size="sm" />
          </Column>
        )}
        <Column lgSize={3} mdSize={3}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: 65,
            }}
          >
            <Button
              icon="fa-check"
              type="primary"
              label={props.values.id ? 'Update' : 'Add'}
              disabled={!props.isDirty()}
              onClick={() => props.onSubmit()}
            />
            <ColumnSeparator size="xs" />
            <Button
              icon="fa-times"
              label="Cancel"
              onClick={() => props.onReset()}
            />
          </div>
        </Column>
      </Row>
    )}
    {!props.isDisabled && (
      <Row>
        <Column lgSize={3} mdSize={4}>
          <FileInput
            disabled={props.submitting}
            label="Upload an audio to the answer"
            accept="audio"
            value={get(props.values, 'audio', '')}
            onChange={(key) => props.onChange('audio', key)}
            errorText={get(props.errors, 'audio', '')}
          />
        </Column>
        <Column lgSize={3} mdSize={4}>
          <FileInput
            disabled={props.submitting}
            label="Upload an image to the answer"
            accept="image"
            value={get(props.values, 'image', '')}
            onChange={(key) => props.onChange('image', key)}
            errorText={get(props.errors, 'image', '')}
          />
        </Column>
      </Row>
    )}
    <Separator size="xs" />
    <Row>
      <Column lgSize={12}>
        <Table
          columns={[
            {
              label: 'ID',
              path: 'id',
              isKey: true,
              hidden: true,
            },
            {
              label: 'Answer',
              path: 'text',
              width: '350px',
              render: (cell, row) => (
                <div
                  style={{
                    whiteSpace: 'normal',
                    textAlign: 'justify',
                    lineHeight: 1.5,
                  }}
                >
                  {row.text}
                </div>
              ),
            },
            {
              label: 'Correct',
              path: 'correct',
              width: '100px',
              render: (cell) => cell ? 'Yes' : 'No',
            },
            {
              label: 'Generated Audio',
              render: (cell, row) => {
                if (row.generatedAudio) {
                  return (<AudioPreview src={row.generatedAudio} />);
                } else {
                  return '-';
                }
              },
            },
            {
              label: 'Audio',
              render: (cell, row) => {
                if (row.audio) {
                  return (<AudioPreview src={row.audio} />);
                } else {
                  return 'No Audio uploaded';
                }
              },
            },
            {
              label: 'Image',
              render: (cell, row) => {
                if (row.image) {
                  return (<ImagePreview src={row.image} />);
                } else if (props.type === 'SINGLE_CHOICE_IMAGE') {
                  return 'No Image uploaded';
                }
              },
            },
            {
              label: 'Actions',
              path: 'action',
              width: '130',
              render: (cell, row) => {
                if (!props.disabled) {
                  return (
                    <div>
                      <IconButton
                        icon="fa-trash"
                        onClick={() => props.onDelete(row.id)}
                      />
                      <IconButton
                        icon="fa-edit"
                        onClick={() => props.onEdit(row.id)}
                      />
                    </div>
                  );
                }
                return null;
              },
            },
          ]}
          rows={props.answers}
        />
        {props.errorText && (
          <ErrorText>{props.errorText}</ErrorText>
        )}
      </Column>
    </Row>
  </div>
);

AnswersInput.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
  })),
  answerType: PropTypes.oneOf([
    'CORRECT',
    'WRONG',
    'BOTH',
  ]).isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'SINGLE_CHOICE_TEXT',
    'SINGLE_CHOICE_AUDIO',
    'SINGLE_CHOICE_IMAGE']).isRequired,
  errorText: PropTypes.string,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  isDirty: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

AnswersInput.defaultProps = {
  answers: [],
  values: {},
  errorText: null,
  disabled: false,
};

export default AnswersInput;
