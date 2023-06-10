//ReactNode serve para definir um componente como tipo da informação
//criação de contextos, uso de estados e useEffect = dispara uma função sempre que algo acontecer 
import { createContext, ReactNode, useState, useEffect } from 'react';

import { auth, firebase } from '../services/firebase';

// Definindo os tipos do usuário
type User = {
    id: string;
    name: string;
    avatar: string;
};
  
//definindo os tipos de informações que terão no contexto
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
    children : ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);  

export function AuthContextProvider(props: AuthContextProviderProps) {
    
    const [ user, setUser] = useState<User>();

    //recebe dois parametros: a função a ser executada e quando a função será executada(sempre será um array)
    useEffect(() => {
    //event listener, perguntar para o vinícius
    const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
        const { displayName, photoURL, uid } = user;

        if(!displayName || !photoURL){
            throw new Error('Missing information from Google Account.')
        };

        setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
        });

        };       
    })

    return() => {
        unsubscribe();
    }

    }, [])



    // o Async e o await serviram para tirar o .them perguntar pro vinícius
    async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider)

    if(result.user){
        const { displayName, photoURL, uid } = result.user;

        if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account.')
        };

        setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
        });

    };       

    };
    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
};