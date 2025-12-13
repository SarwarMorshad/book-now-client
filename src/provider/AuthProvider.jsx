import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import auth from "../config/firebase.config";
import {
  registerOrLoginUser,
  saveAuthData,
  getToken,
  getUser,
  logout as logoutService,
} from "../services/authService";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Provider
  const googleProvider = new GoogleAuthProvider();

  // Sync Firebase user with Backend
  const syncWithBackend = async (firebaseUser) => {
    try {
      const userData = {
        name: firebaseUser.displayName || firebaseUser.email.split("@")[0],
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || "https://i.ibb.co/fMxkR1r/user.png",
        firebaseUid: firebaseUser.uid,
      };

      const response = await registerOrLoginUser(userData);

      if (response.success) {
        saveAuthData(response.token, response.user);
        setUser(response.user);
        return response;
      }
    } catch (error) {
      console.error("Backend sync error:", error);
      toast.error("Failed to sync with server");
      throw error;
    }
  };

  // Create User with Email and Password
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      // Create user in Firebase
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with name and photo
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || "https://i.ibb.co/fMxkR1r/user.png",
      });

      // Reload user to get updated profile
      await result.user.reload();

      // Get updated user
      const updatedUser = auth.currentUser;

      // Sync with backend
      await syncWithBackend(updatedUser);

      toast.success("Registration successful!");
      return result;
    } catch (error) {
      console.error("Registration error:", error);
      setLoading(false);
      throw error;
    }
  };

  // Sign In with Email and Password
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncWithBackend(result.user);
      toast.success("Login successful!");
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Sign In with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const response = await syncWithBackend(result.user);
      toast.success(response.message || "Login successful!");
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Update User Profile
  const updateUserProfile = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      if (auth.currentUser) {
        await syncWithBackend(auth.currentUser);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  // Password Reset
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Log Out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      logoutService();
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  // Observer for Auth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const storedUser = getUser();
        const storedToken = getToken();

        if (storedUser && storedToken) {
          setUser(storedUser);
          setLoading(false);
        } else {
          try {
            await syncWithBackend(currentUser);
          } catch (error) {
            console.error("Auth state sync error:", error);
          } finally {
            setLoading(false);
          }
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUserProfile,
    resetPassword,
    logOut,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
