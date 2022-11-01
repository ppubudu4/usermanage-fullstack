import { useState, useEffect } from "react";
import { useToken } from "./useToken";
import jwtDecode from "jwt-decode";

export const useUser = () => {
  const [token] = useToken();

  const getPayloadFromToken = (token) => {
    const encodedPayload = jwtDecode(token);

    return encodedPayload;
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);

  return user;
};
