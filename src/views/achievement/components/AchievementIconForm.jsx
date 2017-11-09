import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Separator from '../../../core/layout/Separator';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';
import FileInput from '../../../core/form/FileInput';
import Button from '../../../core/form/Button';
import Select from '../../../core/form/Select';

const AchievementIconForm = props => (
  <div>
    <Row>
      <Column lgSize={2} mdSize={3}>
        <FileInput
          label="Icon"
          accept="image"
          value={get(props.values, 'icon', '')}
          onChange={key => props.onChange('icon', key)}
          errorText={get(props.errors, 'icon', '')}
        />
      </Column>
      <Column lgSize={2} mdSize={3}>
        <Select
          label="Position"
          value={get(props.values, 'position', '')}
          onChange={value => props.onChange('position', value)}
          description={get(props.errors, 'position', null)}
          fieldValidation={get(props.errors, 'position', null) && 'error'}
          options={range(1, props.icons.length + 2, 1).map(value => ({
            label: value.toString(),
            value,
          }))}
        />
      </Column>
      <Column lgSize={6} mdSize={6}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 90,
          }}
        >
          <Button
            icon="fa fa-ban"
            fullWidth
            disabled={!props.isDirty()}
            onClick={props.onReset}
            label="Discard changes"
          />
          &emsp;
          <Button
            icon="fa fa-check"
            type="primary"
            fullWidth
            disabled={!props.isDirty()}
            onClick={props.onSave}
            label={props.values.id ? 'Update Icon' : 'Add Icon'}
          />
        </div>
      </Column>
    </Row>
    <Separator />
    <Table
      columns={[
        {
          label: 'Position',
          path: 'position',
          isKey: true,
        },
        {
          label: 'Icon',
          path: 'icon',
          width: '100px',
          render: cell => (
            <img
              src={`${process.env.REACT_APP_API_URL}/files/${cell}`}
              alt="icon"
              style={{
                height: 40,
              }}
            />
          ),
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
      rows={props.icons}
    />
  </div>
);

AchievementIconForm.propTypes = {
  onReset: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isDirty: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  icons: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    position: PropTypes.number,
  })).isRequired,
};

AchievementIconForm.defaultProps = {
  values: {},
  errors: {},
};

export default AchievementIconForm;
