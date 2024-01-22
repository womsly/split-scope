import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  linkWithPopup,
  unlink
} from 'firebase/auth'
import { auth, db } from "../firebase";
import { addDoc, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

export const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true);

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

  const githubConnect = async() => {
    try {
        const userCred = await linkWithPopup(user, new GithubAuthProvider());
        appConsole.log({"userCredential token": userCred})

        const userRef = doc(db, "companies", user.docId)
        await updateDoc(userRef, {
          gh_tokenResponse: userCred._tokenResponse
        })


        setUser(userCred.user)
      } catch (e) {
        appConsole.log(e)
      }
  }

  const githubDisconnect = async() => {
    try {
      const result = await unlink(user, "github.com")
      setUser(result)
    } catch (e) {
      appConsole.log(e)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        let q = query(collection(db, "companies"), where("userId", "==", currentUser?.uid))
        let qSnap = await getDocs(q);

        qSnap.forEach((doc) => {
          if (doc.data()) {
            currentUser.docId = doc.id;
            currentUser.displayName = doc.data().company_name;
            currentUser.authLevel = doc.data().auth_level;
            currentUser.ghTokenResponse = doc.data().gh_tokenResponse;
          }
        })

        if (!currentUser.docId)
        {
          setUser({})
          // let userQ = query(collection(db, "users"), where("userId", "==", currentUser.uid))
          // let userSnap = await getDocs(userQ);

          // userSnap.forEach((doc) => {
          // if (doc.data()) {
          //   currentUser.docId = doc.id;
          //   currentUser.companyId = doc.data().companyId;
          //   currentUser.displayName = doc.data().full_name;
          //   currentUser.authLevel = doc.data().auth_level;
          // }
        } else { 
          setUser(currentUser);
        }
        
        appConsole.log({"updated user": currentUser});
        setIsLoading(false)
      } catch (e) {
        appConsole.log(e)
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])


  return (
    <UserContext.Provider value={{ 
        createCompany, 
        createUser, 
        user, 
        logout, 
        loginUser, 
        isLoading,
        githubConnect,
        githubDisconnect
       }
      }>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}