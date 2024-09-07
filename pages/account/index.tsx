import React, { useState } from "react";
import AccountDetails from "../../components/AccountDetails";
import ChangePassword from "../../components/ChangePassword";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import styles from "../../styles/AccountPage.module.css";

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("AccountDetails");
  const [password, setPassword] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });
  const { user, logout } = useAuth();
  const router = useRouter();

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (!auth.currentUser || !user) return;
    setShowConfirmModal(true);
  };

  // Handle reauthentication with password
  const handlePasswordSubmit = async () => {
    const email = auth.currentUser.email;

    try {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // After successful reauthentication, delete the account
      await deleteUser(auth.currentUser);
      setShowAlertModal({
        message: "Your account has been deleted successfully.",
        type: "success",
      });
      logout();
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      if (error.code === "auth/wrong-password") {
        setShowAlertModal({
          message: "The password you entered is incorrect. Please try again.",
          type: "error",
        });
      } else {
        setShowAlertModal({
          message:
            "Failed to delete account. Please re-authenticate and try again.",
          type: "error",
        });
      }
    } finally {
      setShowPasswordModal(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Account Details</h1>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <ul className={styles.nav}>
            <li
              className={
                activeTab === "AccountDetails" ? styles.activeTab : styles.tab
              }
              onClick={() => setActiveTab("AccountDetails")}
            >
              My Profile
            </li>
            <li
              className={
                activeTab === "ChangePassword" ? styles.activeTab : styles.tab
              }
              onClick={() => setActiveTab("ChangePassword")}
            >
              Change Password
            </li>
            <li className={styles.tab} onClick={handleLogout}>
              Logout
            </li>
            <li className={styles.deleteTab} onClick={handleDeleteAccount}>
              Delete Account
            </li>
          </ul>
        </div>

        <div className={styles.content}>
          {activeTab === "AccountDetails" && <AccountDetails />}
          {activeTab === "ChangePassword" && <ChangePassword />}
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Are you sure?</h2>
            <p className={styles.modalText}>
              This action cannot be undone. Do you really want to delete your
              account?
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.confirmButton}
                onClick={() => {
                  setShowConfirmModal(false);
                  setShowPasswordModal(true);
                }}
              >
                Yes
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Password Modal */}
      {showPasswordModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Enter your password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.modalInput}
            />
            <div className={styles.modalButtons}>
              <button
                className={styles.confirmButton}
                onClick={handlePasswordSubmit}
              >
                Submit
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert Modal */}
      {showAlertModal.type && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>
              {showAlertModal.type === "success" ? "Success" : "Error"}
            </h2>
            <p className={styles.modalText}>{showAlertModal.message}</p>
            <div className={styles.modalButtons}>
              <button
                className={styles.confirmButton}
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

export default AccountPage;
