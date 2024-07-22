import React, {createContext, useContext, useEffect, useState} from 'react';

// Create a context with a default value
const GlobalContext = createContext(null);

// Custom hook to use the GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);

// Provider component
const GlobalProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Mock fetching current user (replace with actual logic)
  useEffect(() => {
    const fetchUser = async () => {
      // Simulate a fetch request
      const user = await new Promise(resolve =>
        setTimeout(
          () => resolve({name: 'John Doe', email: 'john.doe@example.com'}),
          1000,
        ),
      );
      setCurrentUser(user);
    };

    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
