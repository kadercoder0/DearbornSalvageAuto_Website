import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';

const PrivateRoute = ({ children, adminOnly, ...rest }) => {
  const [isAllowed, setIsAllowed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      if (user) {
        if (adminOnly) {
          // Check if the user is an admin
          const docRef = doc(db, 'admin', 'privileges');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const privileges = docSnap.data();
            if (privileges.uid === user.uid) {
              setIsAllowed(true);
            }
          }
        } else {
          setIsAllowed(true);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [adminOnly]);

  if (loading) return <p>Loading...</p>;

  return isAllowed ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
