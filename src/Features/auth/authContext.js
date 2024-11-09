import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase"; // Adjust the path if necessary
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        // Fetch admin privileges from Firestore
        try {
          const privilegesDoc = await getDoc(doc(db, "admin", "privileges"));
          if (privilegesDoc.exists()) {
            const adminUids = privilegesDoc.data().uid;
            setIsAdmin(Array.isArray(adminUids) && adminUids.includes(user.uid));
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching admin privileges:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
