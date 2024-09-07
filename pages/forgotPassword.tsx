import React, { useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import devLogo from "../public/assets/dev-logo-rounded.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        "A password reset email has been sent to your email address."
      );
      setErrorMessage("");
    } catch (error: any) {
      console.error("Password reset error:", error);
      if (error.code === "auth/user-not-found") {
        setErrorMessage("User does not exist.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="forgot-password-page" id="forgot-password">
      <div className="forgot-password-card">
        <div className="back-icon">
          <a href="/">
            <ChevronLeft size={24} color="#000" />
          </a>
        </div>
        <div className="forgot-password-form">
          <div className="forgot-password-header">
            <h1>Forgot Password</h1>
          </div>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {!successMessage && (
            <>
              <form onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="inputField"
                />
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <button type="submit" className="submitButton">
                  Send Reset Link
                </button>
              </form>
              <p>
                Remember your password? <a href="/login">Log in here</a>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        .forgot-password-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f1f1f1;
        }

        .forgot-password-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 400px;
          width: 100%;
          background-color: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .back-icon {
          position: absolute;
          top: 20px;
          left: 20px;
        }

        .forgot-password-form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .forgot-password-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .forgot-password-header h1 {
          font-size: 24px;
          color: #000;
          margin-bottom: 20px;
        }

        .inputField {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }

        .submitButton {
          width: 100%;
          padding: 10px;
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submitButton:hover {
          background-color: #333;
        }

        .error-message {
          color: red;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .success-message {
          color: green;
          font-size: 14px;
          margin-bottom: 10px;
        }

        p {
          text-align: center;
        }

        p a {
          color: #000;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
