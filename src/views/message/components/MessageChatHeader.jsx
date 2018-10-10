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
    <span
      style={{
        fontSize: 22,
        color: 'green',
      }}
    >
      {props.members.reduce((acc, member) => acc.concat(' ').concat(member.name), '')}
    </span>
    <Link
      to={`/records/schools/${head(props.members).schoolClass.school}/classes/${head(props.members).schoolClass.id}/students/${head(props.members).id}/detail`}
      target="_blank"
    >
      - Check student records
    </Link>
    <br />
    <span>
      Classroom: {head(props.members).schoolClass.name}
      <Link
        to={`/records/schools/${head(props.members).schoolClass.school}/classes/${head(props.members).schoolClass.id}/students`}
        target="_blank"
      >
      - Check classroom records
      </Link>
    </span>
    <br />
    <span>Subject: {props.subject}</span>
    <br />
    <span>Since: {moment(props.startedAt).format('DD/MM/YYYY HH:mm')}</span>
  </div>
);

MessageChatHeader.propTypes = {
  subject: PropTypes.string.isRequired,
  startedAt: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MessageChatHeader;
