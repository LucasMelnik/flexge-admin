import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import head from 'lodash/head';
import { Link } from 'react-router';

const MessageChatHeader = props => (
  <div
    style={{
      padding: 10,
      border: '1px solid #ececec',
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    }}
  >
    {props.messageChannel.owner.id === localStorage.getItem('id') ? (
      <div>
        <span
          style={{
            fontSize: 22,
            color: 'green',
          }}
        >
          {props.messageChannel.members.reduce((acc, member) => acc.concat(' ').concat(member.name), '')}
        </span>
        <Link
          to={`/records/schools/${head(props.messageChannel.members).schoolClass.school}/classes/${head(props.messageChannel.members).schoolClass.id}/students/${head(props.messageChannel.members).id}/detail`}
          target="_blank"
        >
          - Check student records
        </Link>
        <br />
        <span>
          Classroom: {head(props.messageChannel.members).schoolClass.name}
          <Link
            to={`/records/schools/${head(props.messageChannel.members).schoolClass.school}/classes/${head(props.messageChannel.members).schoolClass.id}/students`}
            target="_blank"
          >
            - Check classroom records
          </Link>
        </span>
      </div>
    ) : (
      <div>
        <span
          style={{
            fontSize: 22,
            color: 'green',
          }}
        >
          {props.messageChannel.owner.name}
        </span>
        <Link
          to={`/records/schools/${props.messageChannel.owner.schoolClass.school}/classes/${props.messageChannel.owner.schoolClass.id}/students/${props.messageChannel.owner.id}/detail`}
          target="_blank"
        >
          - Check student records
        </Link>
        <br />
        <span>
          Classroom: {props.messageChannel.owner.schoolClass.name}
          <Link
            to={`/records/schools/${props.messageChannel.owner.schoolClass.school}/classes/${props.messageChannel.owner.schoolClass.id}/students`}
            target="_blank"
          >
            - Check classroom records
          </Link>
        </span>
      </div>
    )}
    <span>Subject: {props.messageChannel.subject}</span>
    <br />
    <span>Since: {moment(props.messageChannel.sentAt).format('DD/MM/YYYY HH:mm')}</span>
  </div>
);

MessageChatHeader.propTypes = {
  messageChannel: PropTypes.shape({
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    subject: PropTypes.string.isRequired,
    sentAt: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

export default MessageChatHeader;
