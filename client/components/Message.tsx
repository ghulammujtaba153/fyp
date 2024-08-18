import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';

const Message = ({ message, sender }) => {

  console.log(sender)
  

  const formattedDate = new Date(message.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <div
      className={`flex flex-col max-w-max p-2 rounded-lg m-5 ${
         'mr-auto bg-gray-200 text-left'
      }`}
    >
      <div>{message.content}</div>
      <p className="text-xs text-gray-500">{formattedDate}</p>
    </div>
  );
};

export default Message;
