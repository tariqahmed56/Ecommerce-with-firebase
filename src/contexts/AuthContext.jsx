import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../config/firebaseconfig";
export let AuthContext = createContext();
export const AuthContextProvider = ({children}) =>{
    const [user,setUser] = useState(null);
       const CreateAccount = async (email,password) =>{
        try {
            createUserWithEmailAndPassword(auth,email,password).then(userCredentials=>{
               console.log(userCredentials)
            }).then(()=>{
                LoginUser(email,password)
            }).catch(err=>{
                alert(err.message)
            })
        } catch (error) {
            alert(error);
        }
       }
       const LoginUser = (userEmail,userPassword) => {
        signInWithEmailAndPassword(auth,userEmail,userPassword).then(userCredentials=>{
            let user = userCredentials.user;
        })
       }
       const LogOut = () => {
        signOut(auth);
       }
       const ObserveAuthState = () => {
        onAuthStateChanged(auth,available=>{
            if(available){
                setUser(available)
            }else{
                setUser(null)
            }
        })
       }
    return(
        <AuthContext.Provider value={{user,setUser,CreateAccount,LoginUser,LogOut,ObserveAuthState}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);