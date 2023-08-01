import useAuth from "../hooks/useAuth";

const useLogout = () => {
  const { setAuth, setToken, setPracName } = useAuth();
  return () => {
    localStorage.clear();
    setAuth({});
    setToken({});
    setPracName({});
  };
};

export default useLogout;
