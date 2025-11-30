import { createContext, useContext, useState} from 'react';
export const CaptainDataContext = createContext();

export default function CaptainContext() {
    return useContext(CaptainDataContext);
}

export function CaptainDataProvider({ children }) {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState(null);
    const updateCaptain = (CaptainData) => {
        setCaptain(CaptainData);
      };
      const value={
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain};

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider> 
        
    );
}