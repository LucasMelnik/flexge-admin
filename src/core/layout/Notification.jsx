import React from 'react';
import PropTypes from 'prop-types';

const Notification = props => (
  <ul className="messenger messenger-fixed messenger-on-right messenger-on-top messenger-theme-flat fadeIn animated">
    {props.notifications.map(notification => (
      <li
      key={notification.message}
        className="messenger-message-slot fadeIn animated"
      >
        <div className={`messenger-message message alert ${notification.type} message-${notification.type} alert-${notification.type}`}>
          <button type="button" className="messenger-close" data-dismiss="alert">×</button>
          <div className="messenger-message-inner">{notification.message}</div>
        </div>
      </li>
    ))}
  </ul>
);

Notification.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['error', 'success']).isRequired,
    message: PropTypes.string.isRequired,
  }))
};

Notification.defaultProps = {
  notifications: [],
};

export default Notification;
