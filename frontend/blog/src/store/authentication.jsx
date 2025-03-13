import{Children , useState} from 'react'
import { createContext } from 'react'

export const AuthContext = createContext()
export const AuthContextProvider = ({children}) => {
    const [Token , setToken] = useState(localStorage.getItem('Token')?localStorage.getItem("Token"):null)
    return <AuthContext.Provider value={{Token , setToken}}>
        {children}
    </AuthContext.Provider>
};