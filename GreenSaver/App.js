// import React from "react";
// import { AuthProvider } from "./contexts/Auth";
// import MainStack from "./navigations/MainStack";

// export default function App() {
//   return (
//     <AuthProvider>
//       <MainStack />
//     </AuthProvider>
//   );
// }

import { AuthContext } from "./contexts/Auth";
import { useState } from "react";
import MainStack from "./navigations/MainStack";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: isSignedIn,
        setIsSignedIn: setIsSignedIn,
      }}
    >
      <MainStack />
    </AuthContext.Provider>
  );
}