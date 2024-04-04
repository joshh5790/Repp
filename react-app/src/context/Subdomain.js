import React, { useState, useContext } from 'react';

const SubdomainContext = React.createContext();

export function SubdomainProvider({ children }) {
  const [subdomain, setSubdomain] = useState('www');

  const contextValue = {
    subdomain,
    setSubdomain
  };

  return (
      <SubdomainContext.Provider value={contextValue}>
        {children}
      </SubdomainContext.Provider>
  );
}

export const useSubdomain = () => useContext(SubdomainContext);
