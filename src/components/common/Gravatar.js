import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import md5 from 'md5';

const GravatarAvatar = ({ email, username, size }) => {
  const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
    email
  )}?d=identicon&s=${size}`;

  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%', // Optional: Add a white border around the image
  };
  return (
    <Tippy content={username} placement='bottom'>
      <img
        src={gravatarUrl}
        alt={username}
        style={avatarStyle}
        className='me-2'
      />
    </Tippy>
  );
};

export default GravatarAvatar;
