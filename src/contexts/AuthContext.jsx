import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification ,signInWithEmailAndPassword, signOut , updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseconfig";
import { addDoc, collection, doc, setDoc , getDoc, onSnapshot } from "firebase/firestore";
import Profile from "../Pages/Profile/Profile";

export let AuthContext = createContext();
export const AuthContextProvider = ({children}) =>{

    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState(null);
    const CreateAccount = async (email, password) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            // console.log(userCredentials.user.uid); 
            await setDoc(doc(db, "users", userCredentials.user.uid), {
              email,
              role:"user"
              });
            await sendEmailVerification(auth.currentUser); 
        } catch (error) {
            console.error(error)
            alert(error.message);
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


       const LoginUser =async (userEmail,userPassword) => {
        setLoading(true);
        signInWithEmailAndPassword(auth,userEmail,userPassword).then(userCredentials=>{
            let userinfo = userCredentials.user;
            setUser(userinfo);
            setLoading(false);
        }).catch(err=>{
            console.error(err.message);
            setLoading(false);
        })
       }
       const LogOut = () => {
        signOut(auth);
        setUser(null)
       }
      //  getUserData = async() =>{
      //   const userRef = doc(db, "users", user.uid);
      //   const userDoc = await getDoc(userRef);

      //  }
       


const fetchUserById = async (documentId) => {
  try {
    const docRef = doc(db, "users", documentId);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setUser({ uid: snap.id, ...snap.data() });
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
        <AuthContext.Provider value={{loading,setLoading,user,setUser,CreateAccount,LoginUser,LogOut ,fetchUserById, changePassword }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);