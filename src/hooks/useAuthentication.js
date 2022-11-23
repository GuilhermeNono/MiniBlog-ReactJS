import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    const checkIfIsCancelled = () => {
        if(cancelled) {
            return;
        }
    }


    //Register - Sign up

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true)
        setError(null)

        try {
        
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {displayName:data.displayName})
            setLoading(false)
            return user

            
        } catch (error) {
            
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage;

            if(error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            setError(systemErrorMessage);

            setLoading(false)
        }
    }

    //Logout - Sign out
    const logOut = () => {
        checkIfIsCancelled();

        signOut(auth);

    }

    //Login - Sign in
    const login = async (data) =>{
        checkIfIsCancelled();

        setError(null);
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            let systemErrorMessage;

            if(error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuario não existe"
            } else if(error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            setError(systemErrorMessage);

            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logOut,
        login
    }
}
