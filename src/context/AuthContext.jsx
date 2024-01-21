import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({})

  const createUser = (email, password, name, teamInvite) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async cred => {
        try {
          await addDoc(collection(db, "users"), {
            email: email,
            userId: cred.user.uid,
            full_name: name,
            companyId: teamInvite,
            auth_level: 1,
            account_created: new Date(),
            account_updated: new Date()
          })
        } catch (e) {
          appConsole.log(e.message)
        }
      })
  }

  const createCompany = (email, password, name, companyName) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async cred => {
        try {
          await addDoc(collection(db, "companies"), {
            email: email,
            userId: cred.user.uid,
            full_name: name,
            company_name: companyName,
            auth_level: 3,
            account_created: new Date(),
            account_updated: new Date()
          })
        } catch (e) {
          appConsole.log(e.message)
        }
      })
  }

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      appConsole.log({"current user: ": currentUser});
      setUser(currentUser);
      appConsole.log({"userID: ": currentUser.uid})
    })

    return () => {
      unsubscribe();
    }
  }, [])


  return (
    <UserContext.Provider value={{ createCompany, createUser, user, logout, loginUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}