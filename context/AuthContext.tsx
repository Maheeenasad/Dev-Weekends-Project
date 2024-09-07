import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../utils/firebase";
import { updateEmail, updateProfile } from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase observer to listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // Fetch the latest user data from Firebase
        const refreshedUser = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
          createdAt: currentUser.metadata.creationTime,
        };

        setUser(refreshedUser); // Set the updated user in the state
        localStorage.setItem("user", JSON.stringify(refreshedUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false); // Stop loading after user is set
    });

    return () => unsubscribe();
  }, []);

  const updateUser = async (updatedData) => {
    if (!user) return;

    try {
      // Update the user's email if it has been changed
      if (updatedData.email && updatedData.email !== user.email) {
        await updateEmail(auth.currentUser, updatedData.email);
      }

      // Update the user's profile (name, profile picture)
      await updateProfile(auth.currentUser, {
        displayName: updatedData.name || user.displayName,
        photoURL: updatedData.profilePic || user.photoURL,
      });

      // Update the user in the state and localStorage
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
