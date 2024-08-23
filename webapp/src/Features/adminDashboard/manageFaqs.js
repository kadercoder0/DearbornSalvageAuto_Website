import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {  collection, getDocs, doc, getDoc, updateDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



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
      await updateDoc(questionDocRef, { responseText: responseText });
      setResponseText('');
      setSelectedQuestionId(null);
      alert('Response submitted successfully.');
  
      // Refresh the questions list
      const updatedQuestions = questions.map(q => q.id === selectedQuestionId ? { ...q, responseText } : q);
      setQuestions(updatedQuestions);
    };
  
    const selectQuestion = (questionId, currentResponse) => {
      setSelectedQuestionId(questionId);
      setResponseText(currentResponse || '');
    };
  
    return (

      <div>
      <h1>
      <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>

      </h1>
        <h2>Manage FAQs</h2>
        {questions.map((question) => (
          <div key={question.id} style={{ marginBottom: '20px' }}>
            <p><strong>User:</strong> {question.userName}</p>
            <p><strong>Question:</strong> {question.questionText}</p>
            <p><strong>Response:</strong> {question.responseText || 'No response yet'}</p>
            {!question.responseText && (
              <button 
                onClick={() => selectQuestion(question.id, question.responseText)} 
                style={{ margin: '10px 0', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                Respond to this question
              </button>
            )}
          </div>
        ))}
  
        {selectedQuestionId && (
          <div style={{ marginTop: '20px' }}>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Type your response here..."
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={handleResponseSubmit} style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
              Submit Response
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default ManageFAQs;