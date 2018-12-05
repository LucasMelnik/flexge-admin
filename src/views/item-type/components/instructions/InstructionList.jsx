import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';
import AudioPreview from '../../../../core/layout/AudioPreview';

const InstructionList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Text',
        path: 'text',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Locale',
        path: 'locale',
        width: '70px',
      },
      {
        label: 'Generated Audio',
        render: (cell, row) => {
          if (row.generatedAudio) {
            return (<AudioPreview src={row.generatedAudio} />);
          }
          return '-';
        },
      },
      {
        label: 'Audio',
        render: (cell, row) => {
          if (row.audio) {
            return (<AudioPreview src={row.audio} />);
          }
          return 'No Audio uploaded';
        },
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => (
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
        ),
      },
    ]}
    rows={props.instructions}
  />
);

InstructionList.propTypes = {
  instructions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  itemTypeId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default InstructionList;
