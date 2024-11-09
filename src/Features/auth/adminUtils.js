import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path if necessary

export const checkIfAdmin = async (uid) => {
  try {
    const privilegesDoc = await getDoc(doc(db, "admin", "privileges"));
    if (privilegesDoc.exists()) {
      const adminUids = privilegesDoc.data().uid;                  // uid is now an array
      return Array.isArray(adminUids) && adminUids.includes(uid); // Check if UID is in the array
    }
    return false;
  } catch (error) {
    console.error("Error checking admin privileges:", error);
    return false;
  }
};
