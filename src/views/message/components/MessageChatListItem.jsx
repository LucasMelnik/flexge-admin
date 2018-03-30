import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Avatar from '../../../core/layout/Avatar';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';
import Icon from '../../../core/layout/Icon';

const MessageChatListItem = (props) => {
  const shouldReverse = localStorage.id === props.message.sender.id;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        flexFlow: shouldReverse ? 'row-reverse' : 'row',
      }}
    >
      <div
        style={{
          width: 50,
          textAlign: 'center',
        }}
      >
        {!props.shouldGroup && (
          <Avatar
            src={props.message.sender.profilePicture}
          />
        )}
      </div>
      <div
        style={{
          marginBottom: 5,
          maxWidth: '75%',
          width: 'fit-content',
          borderRadius: 8,
          padding: '5px 15px',
          backgroundColor: '#fff',
          ...(shouldReverse) && {
            borderBottomRightRadius: !props.shouldGroup ? 0 : 8,
            boxShadow: '1px 2px 10px 0 rgba(0, 0, 0, 0.1)',
          },
          ...(!shouldReverse) && {
            // marginRight: 'auto',
            borderBottomLeftRadius: !props.shouldGroup ? 0 : 8,
            boxShadow: '-1px 2px 10px 0 rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <span
          style={{
            display: 'inline-block',
          }}
          dangerouslySetInnerHTML={{ __html: props.message.text }}
        />
        <ColumnSeparator size="xs" />
        <span
          style={{
            display: 'inline-block',
            fontSize: 10,
          }}
        >
          {moment(props.message.sentAt).format('DD/MM/YY HH:mm')}
        </span>
      </div>
      {props.message.readAt && (
        <div
          style={{
            marginBottom: 5,
            ...(shouldReverse) && {
              marginRight: 5,
            },
            ...(!shouldReverse) && {
              marginLeft: 5,
            },
          }}
        >
          <Icon
            name="check"
            style={{
              color: 'green',
            }}
          />
        </div>
      )}
    </div>
  );
};

MessageChatListItem.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    sentAt: PropTypes.string,
    readAt: PropTypes.string,
    sender: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      profilePicture: PropTypes.string,
    }),
  }).isRequired,
  shouldGroup: PropTypes.bool.isRequired,
};

export default MessageChatListItem;
