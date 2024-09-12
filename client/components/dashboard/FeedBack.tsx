"use client";

import React, { useContext, useState } from 'react';
import { Rating } from '@mui/material';
import { UserContext } from '@/context/UserContext';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';

const FeedBack: React.FC = () => {
  const [rating, setRating] = useState<number | null>(0);
  const [liked, setLiked] = useState<string>('');
  const [disliked, setDisliked] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const {user}=useContext(UserContext);

  const handleSubmit = async() => {
    const feedbackData = {
        userId: user._id,
      rating,
      liked,
      disliked,
      suggestion,
    };

    try {
        const ress= await axios.post(`${API_BASE_URL}/feedBack/create`, feedbackData);
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="min-w-[300px] mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Feedback</h1>
      
      <div className="mb-4">
        <p className="font-medium text-gray-700 mb-2">Ratings</p>
        <Rating
          name="appointment-rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={0.5}
          size="large"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="liked" className="font-medium text-gray-700">What you liked</label>
        <input 
          type="text" 
          id="liked" 
          value={liked} 
          onChange={(e) => setLiked(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="What did you like?" 
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="disliked" className="font-medium text-gray-700">What you disliked</label>
        <input 
          type="text" 
          id="disliked" 
          value={disliked} 
          onChange={(e) => setDisliked(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="What did you dislike?" 
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="suggestion" className="font-medium text-gray-700">Any suggestion?</label>
        <textarea
          id="suggestion" 
          value={suggestion} 
          onChange={(e) => setSuggestion(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Any suggestions?" 
          rows={4} 
        />
      </div>
      
      <button 
        onClick={handleSubmit} 
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </div>
  );
};

export default FeedBack;
