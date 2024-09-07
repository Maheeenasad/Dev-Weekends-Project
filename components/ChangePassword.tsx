import React, { useState } from "react";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showAlertModal, setShowAlertModal] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null }); // Modal state

  const { user } = useAuth();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser || !user) return;

    try {
      const email = user.email;

      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword);
      setShowAlertModal({
        message: "Password changed successfully.",
        type: "success",
      });
    } catch (error: any) {
      console.error("Error changing password:", error);
      if (error.code === "auth/wrong-password") {
        setShowAlertModal({
          message: "The current password is incorrect. Please try again.",
          type: "error",
        });
      } else {
        setShowAlertModal({
          message: "Failed to update password. Please try again.",
          type: "error",
        });
      }
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Change Password</h2>
      <form onSubmit={handlePasswordChange} style={styles.form}>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          style={styles.input}
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Update Password
        </button>
      </form>

      {/* Custom Alert Modal */}
      {showAlertModal.type && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>
              {showAlertModal.type === "success" ? "Success" : "Error"}
            </h2>
            <p style={styles.modalText}>{showAlertModal.message}</p>
            <div style={styles.modalButtons}>
              <button
                style={styles.confirmButton}
                onClick={() => setShowAlertModal({ message: "", type: null })}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styling for the password change card and modal
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "#1f1f1f",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#141414",
  },
  modalText: {
    marginBottom: "20px",
    color: "#333",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  confirmButton: {
    backgroundColor: "#141414",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
};

export default ChangePassword;
