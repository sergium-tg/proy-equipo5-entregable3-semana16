import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Base de datos simulada de usuarios registrados
  const [registeredUsers, setRegisteredUsers] = useState([
    { email: 'admin@sistema.com', password: 'admin123', name: 'Administrador' },
    { email: 'usuario@ejemplo.com', password: 'usuario123', name: 'Usuario Demo' }
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Verificar si el usuario está registrado
    const userExists = registeredUsers.find(user => 
      user.email === email && user.password === password
    );

    if (userExists) {
      const userData = {
        id: Date.now(),
        email: userExists.email,
        name: userExists.name,
        role: "user"
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } else {
      // Verificar si el correo existe pero la contraseña es incorrecta
      const emailExists = registeredUsers.find(user => user.email === email);
      if (emailExists) {
        return { success: false, error: "Contraseña incorrecta" };
      } else {
        return { success: false, error: "Este correo no está registrado" };
      }
    }
  };

  const register = async (name, email, password) => {
    // Verificar si el correo ya está registrado
    const emailExists = registeredUsers.find(user => user.email === email);
    
    if (emailExists) {
      return { success: false, error: "Este correo ya está registrado" };
    }

    if (name && email && password) {
      const userData = {
        id: Date.now(),
        name,
        email,
        role: "user"
      };
      
      // Agregar el nuevo usuario a la base de datos simulada
      const newUser = { email, password, name };
      setRegisteredUsers(prev => [...prev, newUser]);
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Datos incompletos" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};