import { createContext, useContext, useState } from "react";

export const UserDataContext = createContext();
export default function UserContext() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const [isLoading, setIsLoading] = useState({})
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });
  
  return (
    <UserDataContext.Provider value={{ user, setUser, isLoading, setIsLoading, error, setError }}>
      {children}
    </UserDataContext.Provider>
  );
}
