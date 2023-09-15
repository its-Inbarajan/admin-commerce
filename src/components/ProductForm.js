import { useState } from "react";
import { useProductContext } from "../hooks/useProductContext";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

const ProductForm = () => {
  const { user } = useAuthContext();

  const { dispatch } = useProductContext();
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [load, setload] = useState("");
  // const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);
  const [Price, setPrice] = useState([]);

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("you must be login in");
      return;
    }

    const products = { title, product, load, Price };
    console.log(products);
    const res = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setEmptyField(json.emptyField);
      toast.error(json.error, error);

      toast.error(json.emptyField, emptyField);
    }

    // const imageData = new FormData();
    // imageData.append("image", image);

    if (product !== "") {
      if (res.ok) {
        setProduct("");
        setTitle("");
        setload("");
        setPrice("");
        setError(null);
        setEmptyField([]);
        dispatch({ type: "CREATE_PRODUCT", payload: json });
        toast.success("Product Successflly added!");
      }
    }
  };

  return (
    <div className="row">
      <div className="col-sm-12 mb-3 mt-4">
        <div className="card border-dark">
          <div className="card-header text-center">
            <h2>Create Product</h2>
          </div>
          <form noValidate onSubmit={handelSubmit}>
            <div className="row">
              <div className="mb-3">
                <label className="form-label">Product Title :</label>
                <input
                  name="PT"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className={emptyField.includes("title") ? "error" : ""}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Name :</label>
                <input
                  className={emptyField.includes("product") ? "error" : ""}
                  name="PN"
                  type="text"
                  onChange={(e) => setProduct(e.target.value)}
                  value={product}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Load :</label>
                <input
                  className={emptyField.includes("load") ? "error" : ""}
                  name="load"
                  onChange={(e) => setload(e.target.value)}
                  value={load}
                  type="text"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">price :</label>
                <input
                  className={emptyField.includes("Price") ? "error" : ""}
                  name="Price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={Price}
                  type="number"
                />
              </div>

              {/* <div class="mb-3">
                <label for="formFile" class="form-label">
                  Images
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.value[0])}
                  value={image}
                />
              </div> */}

              <div className="mb-3 mt-3 text-center">
                <button
                  className="btn btn-sm btn-outline-primary"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
