import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core-ant/Table';
import AudioPreviewButton from '../../../core-ant/AudioPreviewButton';
import UploadButton from '../../../core-ant/UploadButton';
import Button from '../../../core-ant/Button';

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
        label: 'Status',
        path: 'statusAudio',
        render: text => (
          <div
            style={{
              color: '#fff',
              padding: 5,
              fontSize: 12,
              display: 'inline-block',
              fontWeight: 'bold',
              borderRadius: 5,
              minWidth: 'max-content',
              backgroundColor: {
                PENDING: '#ef8c3b',
                NOT_APPROVED: '#758C98',
                APPROVED: '#009687',
              }[text],
            }}
          >
            {text}
          </div>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div>
            {(
              localStorage.getItem('role') === 'AUDIO_CONTENT' &&
              (!record.statusAudio || record.statusAudio === 'PENDING' || record.statusAudio === 'NOT_APPROVED')
            ) && (
              <UploadButton
                label="Click to upload an audio"
                onChange={key => props.onAudioUpload(key, record)}
              />
            )}
            {(localStorage.getItem('role') === 'ADMIN') && (
              <div>
                <UploadButton
                  label="Click to upload an audio"
                  onChange={key => props.onAudioUpload(key, record)}
                />
                {' '}
                {record.statusAudio === 'PENDING' && (
                  <Button
                    onClick={() => props.onChangeStatus('APPROVED', record)}
                    type="primary"
                    icon="like-o"
                  />
                )}
                {' '}
                {record.statusAudio === 'PENDING' && (
                  <Button
                    onClick={() => props.onChangeStatus('NOT_APPROVED', record)}
                    icon="dislike-o"
                  />
                )}
              </div>
            )}
          </div>
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
  onChangeStatus: PropTypes.func.isRequired,
  onAudioUpload: PropTypes.func.isRequired,
};

export default ItemAudioList;
