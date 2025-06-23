import React, { createContext, useContext, useReducer, ReactNode, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

const initialState = {
  isAuthenticated: false, 
  token: null, 
  isLoading: false
}

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setLoading = (value)  => {
    setState({...state, isLoading: value})
  }

  // Función para hacer el login
  const login = async (username, password) => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if(response.ok) {
        const responseBody = await response.json()
        const token = responseBody.token
        setState({isAuthenticated: true, token: token})
        return true;
      } else {
        return false
      }
      
    } catch (error) {
        // se podria hacer algo mejor que esto
        console.log(error)
    }
  };

  // Función para hacer logout
  const logout = async () => {
    setState({...state, isAuthenticated: false, token: null})
  };

  const value = {
    ...state,
    login,
    logout,
    setLoading
  };

  return React.createElement(
  AuthContext.Provider,
  { value: value },
  children
);
};


export default AuthContext;