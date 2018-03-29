import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../core/layout/Avatar';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';

const MessageChatListItem = (props) => {
  const shouldReverse = localStorage.id === props.message.sender.id;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexFlow: shouldReverse ? 'row-reverse' : 'row',
        padding: 10,
      }}
    >
      <Avatar
        src={props.message.sender.profilePicture}
        size="lg"
      />
      <ColumnSeparator size="xs" />
      <div
        style={{
          display: 'inline-block',
          width: '100%',
          textAlign: shouldReverse ? 'right' : 'left',
        }}
      >
        <h4>{props.message.sender.name || props.message.sender.email}</h4>
        <div
          style={{
            maxWidth: '75%',
            width: 'fit-content',
            borderRadius: 8,
            padding: '5px 15px',
            backgroundColor: '#fff',
            ...shouldReverse && {
              marginLeft: 'auto',
              borderBottomRightRadius: 0,
              boxShadow: '1px 2px 4px 0px rgba(0, 0, 0, 0.3)',
            },
            ...!shouldReverse && {
              marginRight: 'auto',
              borderBottomLeftRadius: 0,
              boxShadow: '-1px 2px 4px 0px rgba(0, 0, 0, 0.3)',
            },
          }}
          dangerouslySetInnerHTML={{ __html: props.message.text }}
        />
      </div>
    </div>
  );
}

MessageChatListItem.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    sender: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      profilePicture: PropTypes.string,
    }),
  }).isRequired,
};

export default MessageChatListItem;
