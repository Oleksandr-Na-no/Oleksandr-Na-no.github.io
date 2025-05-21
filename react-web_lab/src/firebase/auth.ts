import { auth } from "./firebase";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name?: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (name) {
    await updateProfile(userCredential.user, {
      displayName: name,
    });
  }

  return userCredential;
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

// ✅ FIXED: Check if user is not null before updating password
export const doPasswordUpdate = (password: string) => {
  if (auth.currentUser) {
    return updatePassword(auth.currentUser, password);
  } else {
    return Promise.reject(new Error("No user is currently signed in."));
  }
};

// ✅ FIXED: Now correctly typed and imported
export const doSendEmailVerification = () => {
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
      handleCodeInApp: true,
    });
  } else {
    return Promise.reject(new Error("No user is currently signed in."));
  }
};
