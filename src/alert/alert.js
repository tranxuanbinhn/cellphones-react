import React, { useState } from 'react';

export const ErrorNotification = ({ message }) => {
  return (
    <div style={{ color: 'red', border: '1px solid red', padding: '10px', margin: '10px 0' }}>
      {message}
    </div>
  );
};

export const SuccessNotification = ({ message }) => {
    return (
      <div style={{ color: 'green', border: '1px solid red', padding: '10px', margin: '10px 0' }}>
        {message}
      </div>
    );
  };
  

