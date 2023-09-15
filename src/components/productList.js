import { useProductContext } from "../hooks/useProductContext";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useEffect } from "react";

const ProductList = ({ product }) => {
  console.log("Im from PL", product);
  const { dispatch, products } = useProductContext();
  const { user } = useAuthContext();

  // const formatter = new Intl.DateTimeFormat("en-GB", {
  //   year: "numeric",
  //   month: "long",
  //   day: "2-digit",
  // });

  // const dateString = product.createdAt;
  // const formattedDate = formatter.format(Date.parse(dateString));

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch("/api/product/", {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     const json = await response.json();
  //     console.log(json);
  //     if (response.ok) {
  //       dispatch({ type: "SET_PRODUCT", payload: json });
  //     }
  //   };
  //   if (user) {
  //     fetchProducts();
  //   }

  //   console.log("productList");
  // }, []);

  const handelDelete = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch("/api/product/" + product._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_PRODUCT", payload: json });
        toast.success("Successfully Deleted!");
      }
    } catch (error) {
      console.log("error in productlist", error);
    }
  };

  return (
    <div className="row">
      <div className="col-sm-6 mb-3">
        {products.length &&
          products.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <h1 className="product-title">{item.title}</h1>
              </div>
              <div className="row">
                <div className="p-4 m-2">
                  <p>
                    <b>Product Name :</b>
                    {item.product}
                  </p>

                  <p>
                    <b>Quantitys :</b>
                    {item.load}
                  </p>
                  <p>
                    <b>Price :</b>
                    {item.Price}
                  </p>
                  <div className="text-center">
                    <button
                      className="btn btn-outline-danger"
                      onClick={handelDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
