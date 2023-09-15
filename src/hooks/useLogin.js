import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsloading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsloading(false);

      toast.error(json.error);
    }

    if (response.ok) {
      // save user to localstrong
      localStorage.setItem("user", JSON.stringify(json));
      // update of context
      dispatch({ type: "LOGIN", payload: json });
      toast.success("Login Successfull!", dispatch);
    }
  };
  return { login, error, isloading };
};
