import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import AudioPreview from '../../../core/layout/AudioPreview';
import StatusItem from '../../../core/layout/StatusItem';
import Button from '../../../core/form/Button';
import UploadButton from '../../../core/form/UploadButton';

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
        width: '150px',
      },
      {
        label: 'Audio',
        path: 'audio',
        width: '70px',
        render: (text, record) => record.audio && <AudioPreview src={record.audio} />,
      },
      {
        label: 'Comments',
        path: 'commentsAudio',
        width: '300px',
        render: text => <div dangerouslySetInnerHTML={{ __html: text }} />,
      },
      {
        label: 'Status',
        path: 'statusAudio',
        width: '130px',
        sort: true,
        render: text => (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              NOT_APPROVED: '#758C98',
              APPROVED: '#009687',
            }[text]}
            text={text}
          />
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div
            style={{
              minWidth: 120,
            }}
          >
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
    rows={props.items}
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
