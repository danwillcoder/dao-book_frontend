import { createContext, useState } from "react";
import { isJwtExpired } from "../utils";

// create ctx
const AuthContext = createContext({});

function AuthProvider({ children }) {
  const localAuth = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(localAuth);

  if (auth) {
    const isValid = isJwtExpired(auth);
    if (!isValid) {
      setAuth();
    }
  }
  // TODO for persistence, we need to reach into localStorage and check for a token.
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
