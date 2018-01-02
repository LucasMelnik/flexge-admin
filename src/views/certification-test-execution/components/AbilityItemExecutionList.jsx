import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../../../core/layout/Tag';
import Table from '../../../core/form/Table';
import AudioPreview from '../../../core/layout/AudioPreview';

const AbilityItemExecutionList = props => (
  <Table
    fetching={props.fetching}
    rows={props.items}
    columns={[
      {
        label: 'Question/Subject',
        path: 'item.text',
      },
      {
        label: 'Answer',
        path: 'answer',
        render: cell => props.ability === 'SPEAKING' ? (
          <AudioPreview src={cell} />
        ) : cell,
      },
      {
        label: 'Correct',
        path: 'correct',
        width: '100px',
        align: 'center',
        render: cell => cell !== undefined && <Tag color={cell ? 'green' : 'red'}>{cell ? 'Correct' : 'Wrong'}</Tag>,
      },
    ]}
  />
);

AbilityItemExecutionList.propTypes = {
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ability: PropTypes.oneOf([
    'READING',
    'LISTENING',
    'SPEAKING',
    'WRITING',
  ]).isRequired,
};

export default AbilityItemExecutionList;
