import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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
        defaultSortOrder: 'ascend',
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
        render: text => text && (
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
              (record.itemTypeKey !== 'SINGLE_CHOICE_GAME' || !(record.itemTypeKey === 'SINGLE_CHOICE_GAME' && record.children)) &&
              (!record.statusAudio || record.statusAudio === 'PENDING' || record.statusAudio === 'NOT_APPROVED')
            ) && (
              <UploadButton
                label="Click to upload an audio"
                onChange={key => props.onAudioUpload(key, record)}
              />
            )}
            {(localStorage.getItem('role') === 'ADMIN') && (
              <div>
                {(record.itemTypeKey !== 'SINGLE_CHOICE_GAME' || !(record.itemTypeKey === 'SINGLE_CHOICE_GAME' && record.children)) && (
                  <UploadButton
                    label="Click to upload an audio"
                    onChange={key => props.onAudioUpload(key, record)}
                  />
                )}
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
                {(record.unitItem && record.unitItem.order && record.unitItem.unit) && (
                  <Link
                    target="_blank"
                    to={`modules/${record.unitItem.unit.module}/units/${record.unitItem.unit.id}/items`}
                  >
                    Unit - Order: {record.unitItem.order} Group: {record.unitItem.group}
                  </Link>
                )}
                {(record.masteryItem && record.masteryItem.order && record.masteryItem.masteryTest) && (
                  <Link
                    target="_blank"
                    to={`modules/${record.masteryItem.masteryTest.module}/mastery-tests/${record.masteryItem.masteryTest.id}`}
                  >
                    MT - Item Order: {record.masteryItem.order}
                  </Link>
                )}
                {(record.grammarItem && record.grammarItem.id) && (
                  <Link
                    target="_blank"
                    to={`placement-test/${record.grammarItem.id}`}
                  >
                    Placement Test
                  </Link>
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
