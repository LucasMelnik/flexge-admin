import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Table from '../../../core/form/Table';
import FileInput from '../../../core/form/FileInput';
import Button from '../../../core/form/Button';
import Select from '../../../core/form/Select';

const AchievementIconForm = props => (
  <div>
    <Row>
      <Column size={2}>
        <FileInput
          label="Icon"
          accept="image"
          value={get(props.values, 'icon', '')}
          onChange={key => props.onChange('icon', key)}
          errorText={get(props.errors, 'icon', '')}
        />
      </Column>
      <Column size={2}>
        <Select
          label="Position"
          value={get(props.values, 'position', '')}
          onChange={value => props.onChange('position', value)}
          errorText={get(props.errors, 'position', null)}
          options={range(1, props.icons.length + 2, 1).map(value => ({
            label: value.toString(),
            value,
          }))}
        />
      </Column>
      <Column size={6}>
        <div
          style={{
            marginTop: 34,
          }}
        >
          <Button
            icon="reload"
            fullWidth
            disabled={!props.isDirty()}
            onClick={props.onReset}
            label="Discard changes"
          />
          &emsp;
          <Button
            icon="check"
            type="primary"
            fullWidth
            disabled={!props.isDirty()}
            onClick={props.onSave}
            label={props.values.id ? 'Update Icon' : 'Add Icon'}
          />
        </div>
      </Column>
    </Row>
    <Table
      columns={[
        {
          label: 'Icon',
          path: 'icon',
          width: '105px',
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
