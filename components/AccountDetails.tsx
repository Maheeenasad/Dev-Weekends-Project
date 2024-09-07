import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AccountDetails: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email || "");
        setProfilePic(user.photoURL || "/assets/user.jpg");

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setPhone(data.phone || "N/A");
          setDesignation(data.designation || "N/A");
          setLocation(data.location || "N/A");
        }
      }
    };

    loadUserData();
  }, [user]);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfilePic(e.target.files[0]);
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    let profilePicURL = profilePic;

    if (newProfilePic) {
      setIsUploading(true);
      const storageRef = ref(
        storage,
        `profile-pictures/${user.uid}/${newProfilePic.name}`
      );
      try {
        await uploadBytes(storageRef, newProfilePic);
        profilePicURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Failed to upload image:", error);
      } finally {
        setIsUploading(false);
      }
    }

    await updateUser({
      name,
      email,
      profilePic: profilePicURL,
    });

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(
      userDocRef,
      {
        phone,
        designation,
        location,
      },
      { merge: true }
    );

    setIsEditing(false);
  };

  return (
    <div style={styles.card}>
      {isEditing ? (
        <>
          <div style={styles.header}>
            <div style={styles.profilePic}>
              {profilePic && (
                <img
                  src={profilePic}
                  alt="Profile"
                  style={styles.profileImage}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={styles.fileInput}
              />
            </div>
            <div style={styles.profileInfo}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                placeholder="Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="Email"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
                placeholder="Phone"
              />
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                style={styles.input}
                placeholder="Designation"
              />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={styles.input}
                placeholder="Location"
              />
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button
              onClick={() => setIsEditing(false)}
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={styles.saveButton}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={styles.header}>
            <div style={styles.profilePic}>
              <img
                src={profilePic}
                alt="Profile Pic"
                style={styles.profileImage}
              />
            </div>
            <div style={styles.profileInfo}>
              <h3 style={styles.name}>{name || "N/A"}</h3>
              <p style={styles.designation}>{designation || "N/A"}</p>
              <p style={styles.location}>{location || "N/A"}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              style={styles.editButton}
            >
              Edit
            </button>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Personal Information</h4>
            <div style={styles.infoRow}>
              <div style={styles.infoItem}>
                <p>
                  <strong>First Name</strong>
                </p>
                <p>{name.split(" ")[0] || "N/A"}</p>
              </div>
              <div style={styles.infoItem}>
                <p>
                  <strong>Last Name</strong>
                </p>
                <p>{name.split(" ")[1] || "N/A"}</p>
              </div>
            </div>
            <div style={styles.infoRow}>
              <div style={styles.infoItem}>
                <p>
                  <strong>Email Address</strong>
                </p>
                <p>{email}</p>
              </div>
              <div style={styles.infoItem}>
                <p>
                  <strong>Phone</strong>
                </p>
                <p>{phone || "N/A"}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Styling for AccountDetails
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "#141414",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
  profilePic: {
    display: "flex",
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center",
    gap: "10px", 
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
  fileInput: {
    display: "block",
    textAlign: "center", 
    marginTop: "10px",
    marginLeft: "100px",
    color: "#ffffff",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "300px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
  designation: {
    fontSize: "14px",
    color: "#ffffff",
    textAlign: "center",
  },
  location: {
    fontSize: "14px",
    color: "#ffffff",
    textAlign: "center",
  },
  editButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    width: "100%",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "15px",
  },
  infoRow: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  infoItem: {
    flex: 1,
    marginBottom: "10px",
    color: "#ffffff",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    backgroundColor: "#333",
    color: "#ffffff",
  },
};

export default AccountDetails;
