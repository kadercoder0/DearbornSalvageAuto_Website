import { doc, getDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../../firebase'; // Import the initialized Firestore database

export const checkIfAdmin = async (uid) => {
    // Reference to the 'privileges' document in the 'admin' collection
    const adminRef = doc(db, 'admin', 'privileges');
    const adminDoc = await getDoc(adminRef);

    // Check if the document exists and if the UID matches the one stored
    if (adminDoc.exists()) {
        const adminUid = adminDoc.data().uid;
        const isAdmin = adminUid === uid;

        // Log the admin status to the console
        if (isAdmin) {
            console.log(`User with UID: ${uid} is an admin.`);
        } else {
            console.log(`User with UID: ${uid} is not an admin.`);
        }

        return isAdmin;
    } else {
        console.log("No admin privileges document found.");
        return false;
    }
};

