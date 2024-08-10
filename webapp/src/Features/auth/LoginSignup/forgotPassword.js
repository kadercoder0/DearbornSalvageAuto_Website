import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = e.target.email.value;

        try {
            await sendPasswordResetEmail(auth, userEmail);
            alert("Check your email for a password reset link.");
        } catch (error) {
            // Handle different error cases
            if (error.code === 'auth/user-not-found') {
                alert("No user found with this email.");
            } else if (error.code === 'auth/invalid-email') {
                alert("Invalid email format.");
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');  // Navigates to the home page
    };

    return (
        <div className="App">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Enter your email" required /><br /><br />
                <button type="submit">Reset</button>
            </form>
            <button onClick={handleBackToLogin}>Back to Login</button>  

        </div>
    );
}

export default ForgotPassword;
