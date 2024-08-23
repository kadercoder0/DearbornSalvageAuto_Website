import { Link } from 'react-router-dom'; 
import React, { useState } from 'react';
import { db, auth } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const FAQ = () => {
  const [questionText, setQuestionText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser; // Get the currently authenticated user

    if (!currentUser) {
      alert('You must be logged in to submit a question.');
      return;
    }

    try {
      await addDoc(collection(db, 'questions'), {
        uid: currentUser.uid, // Using the currentUser's UID
        questionText: questionText,
        responseText: '',
        timestamp: serverTimestamp(),
      });
      setQuestionText('');
      alert('Your question has been submitted.');
    } catch (error) {
      console.error('Error submitting question: ', error);
      alert('There was an error submitting your question.');
    }
  };

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      {/* Display existing FAQs here */}
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Have a question? Ask here..."
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit Question
        </button>
        <Link to="/home" className="nav-link">Back to Home</Link>
      </form>
    </div>
  );
};

export default FAQ;
