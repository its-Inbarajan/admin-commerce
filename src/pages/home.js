import { useEffect, useState } from "react";
// import { useProductContext } from "../hooks/useProductContext";
// import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

// components
// import ProductList from "../components/productList";
import ProductForm from "../components/ProductForm";
const Home = () => {
  // const { products, dispatch } = useProductContext();
  // const { user } = useAuthContext();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch("/api/product/", {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     const json = await response.json();
  //     if (response.ok) {
  //       dispatch({ type: "SET_PRODUCT", payload: json });
  //     }
  //   };
  //   if (user) {
  //     fetchProducts();
  //   }
  // }, [dispatch, user]);

  const [showProduct, setShowProduct] = useState([]);
  useEffect(() => {
    axios.get("/api/product/").then((res) => {
      setShowProduct(res.data);
      // console.log(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="text-center mb-3 mt-4">
        <h1>Home</h1>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <ProductForm />
        </div>
        <div className="col-md-12 mb-3">
          {/* {products.length &&
            products.map((product, index) => (
              <ProductList key={index._id} product={product} />
            ))} */}
          {showProduct.length &&
            showProduct.map((item, index) => (
              <div className="card" key={index}>
                <div className="card-title">{item.title}</div>
                <div className="card-body">
                  <div className="card-text">{item.product}</div>
                  <div className="card-text">{item.load}</div>
                  <div className="card-text">{item.Price}</div>
                  {/* <div className="card-text"></div> */}
                </div>
              </div>
            ))}
        </div>

        {/* {JSON.stringify(products)} */}
      </div>
    </div>
  );
};

export default Home;
