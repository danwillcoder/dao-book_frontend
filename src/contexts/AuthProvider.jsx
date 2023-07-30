import { createContext, useState } from "react";

// create ctx
const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  // TODO for persistence, we need to reach into localStorage and check for a token.
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
