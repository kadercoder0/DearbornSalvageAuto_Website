import { Link } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; 
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { format } from 'date-fns';
import styles from './faq.module.css'; // Assuming you want to move the styles to a separate CSS file

const FAQ = () => {
  const [questionText, setQuestionText] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'questions'), (snapshot) => {
      const questionsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          formattedTimestamp: data.timestamp ? format(data.timestamp.toDate(), 'MMMM dd, yyyy HH:mm') : null,
          formattedResponseTimestamp: data.responseTimestamp ? format(data.responseTimestamp.toDate(), 'MMMM dd, yyyy HH:mm') : null,
        };
      });
      setQuestions(questionsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert('You must be logged in to submit a question.');
      return;
    }

    try {
      await addDoc(collection(db, 'questions'), {
        uid: currentUser.uid,
        questionText: questionText,
        responseText: '',
        timestamp: serverTimestamp(),
        responseTimestamp: null, // Initially null since there's no response yet
      });
      setQuestionText('');
      alert('Your question has been submitted.');
    } catch (error) {
      console.error('Error submitting question: ', error);
      alert('There was an error submitting your question.');
    }
  };

  return (
    <div className={styles.faqContainer}>
      <h2>Frequently Asked Questions</h2>
      
      {/* Display existing FAQs */}
      <div className={styles.questionList}>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question.id} className={styles.questionBlock}>
              <p><strong>Question:</strong> {question.questionText}</p>
              {question.formattedTimestamp && <p><em>Asked on {question.formattedTimestamp}</em></p>}
              <p>
                <strong>Response:</strong> {question.responseText 
                  ? `System Admin: ${question.responseText} on ${question.formattedResponseTimestamp}` 
                  : 'No response yet'}
              </p>
            </div>
          ))
        ) : (
          <p>No questions have been asked yet.</p>
        )}
      </div>
      
      {/* Form to submit a new question */}
      <form onSubmit={handleSubmit} className={styles.submitForm}>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Have a question? Ask here..."
          required
          className={styles.textarea}
        />
        <button type="submit" className={styles.submitButton}>
          Submit Question
        </button>
        <Link to="/home" className={styles.backLink}>Back to Home</Link>
      </form>
    </div>
  );
};

export default FAQ;
