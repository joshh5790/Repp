import React, { useState, useEffect, useContext } from 'react';
import { getDomain } from '../utilities';

const DomainContext = React.createContext();

export function DomainProvider({ children }) {
  const [domain, setDomain] = useState([])

  useEffect(() => {
    setDomain(() => getDomain())
  }, [])

  const contextValue = {
    domain,
    setDomain
  };

  return (
      <DomainContext.Provider value={contextValue}>
        {children}
      </DomainContext.Provider>
  );
}

export const useDomain = () => useContext(DomainContext);
