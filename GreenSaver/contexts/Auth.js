// import React from "react";

// export const AuthContext = React.createContext({
//   isSignedIn: false,
//   setIsSignedIn: () => {},
// });

import React, { useState } from "react";

export const AuthContext = React.createContext({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
