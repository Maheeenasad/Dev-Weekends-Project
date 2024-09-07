import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  ChevronLeft,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create the user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setSuccessMessage(
        "You have registered successfully! Redirecting to the homepage..."
      );

      // Optional: Update display name in Firebase user profile
      if (user) {
        await updateProfile(user, { displayName: name });
      }

      // Log the user in by passing the user object
      login(user);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="back-icon">
          <a href="/">
            <ChevronLeft size={24} color="#000" />
          </a>
        </div>
        <div className="login-form">
          <div className="login-header">
            <Image
              src="/assets/dev-logo-rounded.png"
              alt="Dev Weekends"
              width={100}
              height={100}
            />
            <h1>Register</h1>
          </div>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {!successMessage && (
            <form onSubmit={registerHandler}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="inputField"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="inputField"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="inputField"
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit" className="submitButton">
                Register
              </button>
            </form>
          )}
          {!successMessage && (
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
          )}
        </div>
        <div className="login-info">
          <div className="info-background">
            <div className="background-overlay"></div>
            <div className="info-text">
              <h2>Dev Weekends</h2>
              <p>
                Dev Weekends is a non-profit community dedicated to mentoring
                students and empowering them to excel in engineering roles.
              </p>
              <div className="social-icons">
                <a href="https://www.facebook.com">
                  <Facebook size={24} />
                </a>
                <a href="https://www.instagram.com">
                  <Instagram size={24} />
                </a>
                <a href="https://www.linkedin.com">
                  <Linkedin size={24} />
                </a>
                <a href="https://www.youtube.com">
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background-color: #f1f1f1;
        }

        .login-card {
          display: flex;
          flex-direction: row;
          max-width: 1000px;
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        /* Mobile view: Form above image */
        @media (max-width: 768px) {
          .login-card {
            flex-direction: column;
          }

          .login-form {
            order: 1;
          }

          .login-info {
            order: 2;
          }
        }

        .back-icon {
          position: absolute;
          top: 20px;
          left: 20px;
        }

        .login-form {
          flex: 1;
          padding: 40px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 400px;
          margin: 0 auto;
        }

        .login-header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin-bottom: 20px;
        }

        .login-header h1 {
          font-size: 24px;
          color: #000;
          margin-bottom: 20px;
        }

        .inputField,
        .submitButton {
          width: 100%;
          max-width: 300px;
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }

        .submitButton {
          background-color: #000;
          color: #fff;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
        }

        .submitButton:hover {
          background-color: #333;
        }

        .login-info {
          flex: 1;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #141414;
          overflow: hidden;
        }

        /* Use a pseudo-element for the background image */
        .login-info::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("/assets/reg-bg.jpeg");
          background-size: cover;
          background-position: center;
          opacity: 0.1;
          z-index: 1;
        }

        .info-text {
          position: relative;
          z-index: 2;
          max-width: 400px;
          text-align: center;
          color: white;
        }

        .info-text h2 {
          font-size: 28px;
          margin-bottom: 20px;
        }

        .info-text p {
          font-size: 16px;
          line-height: 1.5;
        }

        .social-icons {
          margin-top: 20px;
          display: flex;
          gap: 15px;
          justify-content: center;
          z-index: 2;
          margin-bottom: 20px;
        }

        .social-icons a {
          width: 40px;
          height: 40px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.3s, transform 0.3s;
          cursor: pointer;
          color: #141414;
        }

        .social-icons a:hover {
          background-color: #e6e6e6;
          color: #141414;
          transform: scale(1.1);
        }

        .social-icons a svg {
          color: #141414;
          width: 24px;
          height: 24px;
          transition: color 0.3s ease;
        }

        .error-message {
          color: red;
          font-size: 14px;
          margin-top: -10px;
          margin-bottom: 10px;
        }

        .success-message {
          color: green;
          font-size: 14px;
          margin-top: -10px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Register;
