import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import auth from '../firebase/firebase.init';
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();

    const handleRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const handleLoginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const handleLoginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const handleLogOut = () => {
        toast.success("You have successfully Logout!")
        return signOut(auth);
    }
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
            else {
                setUser(null);
            }
        })

        return () => {
            unsubcribe();
        }
    }, []);

    const authInfo = {
        user,
        setUser,
        handleRegister,
        handleLoginWithEmail,
        handleLoginWithGoogle,
        handleLogOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;