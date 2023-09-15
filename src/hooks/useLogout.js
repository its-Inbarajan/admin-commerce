import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";
import { useProductContext } from "./useProductContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: productDispatch } = useProductContext();

  const logout = () => {
    // remove user from storage

    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });

    productDispatch({ type: "SET_PRODUCT", payload: null });

    toast("See you again!", {
      icon: "👋",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        font: "19px",
      },
    });
  };

  return { logout };
};
