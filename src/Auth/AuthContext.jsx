import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";


const init = () => {
    return JSON.parse(localStorage.getItem('isLogged'))|| {logged: false};
}

export const AuthContext =createContext({});

export const AuthProvider = ({children})=>{

    const [isLogged, dispatch] = useReducer(AuthReducer,{},init)
    console.log(isLogged);
    
    useEffect(() =>{
        localStorage.setItem('isLogged', JSON.stringify(isLogged));
        
    },[isLogged]);

    return <AuthContext.Provider value={{ isLogged, dispatch}}>
        {children}
    </AuthContext.Provider>
}
