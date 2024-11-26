import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification ,signInWithEmailAndPassword, signOut , updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseconfig";
import { addDoc, collection, doc, setDoc , getDoc, onSnapshot } from "firebase/firestore";
import Profile from "../Pages/Profile/Profile";
import { useNavigate } from "react-router-dom";

export let AuthContext = createContext();
export const AuthContextProvider = ({children}) =>{
    const navigate  = useNavigate();
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState(null);
    const [error,setError] = useState(null)
    
    const CreateAccount = async (email, password, setError , successMessage , setIsSubmitting ) => {
        try {
          setIsSubmitting(true)
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const userId = await userCredentials.user.uid;
            
            await sendEmailVerification(auth.currentUser);
            successMessage("Account created! Verification email sent. Please check your inbox.");
            await setDoc(doc(db, "users", userId), {
                email,
                role: "user",
            });
           setIsSubmitting(false)
    
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
            if (error.code === "auth/email-already-in-use") {
                setError("Email is already in use. If it's yours, please log in.");
            } else if (error.code === "auth/weak-password") {
                setError("Password is too weak. Please choose a stronger password.");
            } else {
                setError("An error occurred while creating your account. Please try again.");
            }
        }
    };
    
const changePassword = async (currentPassword, newPassword) => {
  try {
    // firebase requires re-authentication for Security purposes, 
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    console.log("User re-authenticated");
    await updatePassword(user, newPassword);
    console.log("Password updated successfully");
  } catch (error) {
    console.error("Error changing password: ", error);
    alert(error.message);
  }
};


       const LoginUser = async (userEmail,userPassword) => {
        setLoading(true);
        signInWithEmailAndPassword(auth,userEmail,userPassword).then(userCredentials=>{
            let userinfo = userCredentials.user;
            localStorage.setItem("user",JSON.stringify(userinfo))
            setUser(userinfo);
            setLoading(false);
            navigate('/profile');
        }).catch(err=>{
            console.error(err);
            if(err.code === 'auth/invalid-credential') setError("Invalid credentials")
            else setError(null)
            setLoading(false);
        })
       }
       const LogOut = () => {
        signOut(auth);
        localStorage.clear();
        setUser(null)
       }
   


const fetchUserById = async(documentId)=> {
  try {
    const docRef = doc(db, "users", documentId);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setUser({...snap.data() , uid:snap.id});
      } else {
        console.error("User is not logged In");
        setUser(null); 
      }
    });
     return unsubscribe;
  } catch (error) {
    console.error(error);
  }
};
 
 
    return(
        <AuthContext.Provider value={
          {loading,setLoading,user,setUser,CreateAccount,LoginUser, error,LogOut ,fetchUserById, changePassword   }
          }>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);