import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from '../Features/adminDashboard/manageFaq.module.css'; // Import the CSS module

const ManageFAQs = () => {
  const [questions, setQuestions] = useState([]);
  const [responseText, setResponseText] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionsData = await Promise.all(querySnapshot.docs.map(async (questionDoc) => {
        const questionData = questionDoc.data();
        const userDocRef = doc(db, 'users', questionData.uid);
        const userDoc = await getDoc(userDocRef);
        const userName = userDoc.exists() ? userDoc.data().name : 'Unknown User';

        return {
          id: questionDoc.id,
          userName: userName,
          ...questionData,
        };
      }));
      setQuestions(questionsData);
    };

    fetchQuestions();
  }, []);

  const handleResponseSubmit = async () => {
    if (!responseText || !selectedQuestionId) {
      alert('Please select a question and enter a response before submitting.');
      return;
    }

    const questionDocRef = doc(db, 'questions', selectedQuestionId);
    await updateDoc(questionDocRef, { 
      responseText: responseText,
      responseTimestamp: serverTimestamp()
    });
    setResponseText('');
    setSelectedQuestionId(null);
    alert('Response submitted successfully.');

    const updatedQuestions = questions.map(q => 
      q.id === selectedQuestionId ? { ...q, responseText, responseTimestamp: new Date() } : q
    );
    setQuestions(updatedQuestions);
  };

  const selectQuestion = (questionId, currentResponse) => {
    setSelectedQuestionId(questionId);
    setResponseText(currentResponse || '');
  };

  return (
    <div className={styles['manage-faqs-container']}>
      <h1>Manage FAQs</h1>
      
      {questions.map((question) => (
        <div key={question.id} className={styles['question-block']}>
          <p><strong>User:</strong> {question.userName}</p>
          <p><strong>Question:</strong> {question.questionText}</p>
          <p><strong>Response:</strong> {question.responseText || 'No response yet'}</p>
          {!question.responseText && (
            <button 
              onClick={() => selectQuestion(question.id, question.responseText)} 
              className={styles['submit-button']}
            >
              Respond to this question
            </button>
          )}
        </div>
      ))}
  
      {selectedQuestionId && (
        <div className={styles['response-form']}>
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Type your response here..."
            required
            className={styles['textarea']}
          />
          <button onClick={handleResponseSubmit} className={styles['submit-button']}>
            Submit Response
          </button>
        </div>
      )}

      <div className={styles['bottom-button-container']}>
        <button 
          onClick={() => navigate('/home')} 
          className={styles['back-to-dashboard-button']}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ManageFAQs;
