import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, username) => {
    setIsloading(true);

    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsloading(false);
      setError(json.error);
      toast.error(json.error);
    }

    if (response.ok) {
      // save user to localstrong

      localStorage.setItem("user", JSON.stringify(json));

      // update of context
      dispatch({ type: "LOGIN", payload: json });

      setIsloading(false);
      toast.success("Login Successfull!", dispatch);
    }
  };
  return { signup, error, isloading };
};
