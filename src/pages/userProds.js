import { useEffect } from "react";
import { useProductContext } from "../hooks/useProductContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ProductList from "../components/productList";

export const ShowUserProducts = () => {
  const { products, dispatch } = useProductContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_PRODUCT", payload: json });
      }

      console.log(response);
    };
    if (user) {
      fetchProducts();
    }
  }, [dispatch, user]);

  return (
    <div>
      {products.length &&
        products.map((item, index) => {
          return <p key={index}>{item.title}</p>;
        })}
    </div>
  );
};
