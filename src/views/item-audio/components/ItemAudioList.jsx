import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core-ant/Table';
import AudioPreviewButton from '../../../core-ant/AudioPreviewButton';
import UploadButton from '../../../core-ant/UploadButton';

const ItemAudioList = props => (
  <Table
    fetching={props.fetching}
    pagination={props.pagination}
    onChange={props.onChange}
    columns={[
      {
        label: 'Text',
        path: 'text',
        sort: true,
      },
      {
        label: 'Character',
        path: 'character.name',
        sort: true,
      },
      {
        label: 'Audio',
        path: 'audio',
        render: (text, record) => record.audio && <AudioPreviewButton src={record.audio} />,
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          (!record.audioStatus || record.audioStatus === 'PENDING' || record.audioStatus === 'NOT_APPROVED') && (
            <UploadButton
              label="Click to upload an audio"
              onChange={key => props.onAudioUpload(key, record)}
            />
          )
        ),
      },
    ]}
    dataSource={props.items}
  />
);

ItemAudioList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    character: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  pagination: PropTypes.shape({
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onAudioUpload: PropTypes.func.isRequired,
};

export default ItemAudioList;
