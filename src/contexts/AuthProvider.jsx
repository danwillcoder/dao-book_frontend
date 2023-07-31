import { createContext, useState } from "react";
import { isJwtExpired } from "../utils";

// create ctx
const AuthContext = createContext({});

function AuthProvider({ children }) {
  const localAuth = JSON.parse(localStorage.getItem("auth"));
  const localToken = JSON.parse(localStorage.getItem("authToken"));
  const localPracName = JSON.parse(localStorage.getItem("pracName"));
  const [auth, setAuth] = useState(localAuth);
  const [token, setToken] = useState(localToken);
  const [pracName, setPracName] = useState(localPracName);

  if (auth) {
    const isValid = isJwtExpired(auth);
    if (!isValid) {
      setAuth();
    }
  }
  // TODO for persistence, we need to reach into localStorage and check for a token.
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, token, setToken, pracName, setPracName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
