import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const Bookings = () => {
  const [booked, setBooked] = useState([]);
  const [seprateValue, setSeprateValue] = useState([{}]);

  const [show, setShow] = useState(false);
  useEffect(() => {
    axios
      .get("/api/bookings/")
      .then((res) => {
        setBooked(res.data.bookedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handelDetails = (id) => {
    axios.get(`/api/bookings/${id} `).then((res) => {
      setShow(true);
      setSeprateValue(res.data.seprateProduct);
      // console.log(res.data.seprateProduct);
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="container mt-4 mb-4">
      <table className="table border border-dark text-center">
        <thead>
          <tr className="text-center">
            <th className="border border-dark" scope="col">
              _id
            </th>
            <th scope="col" className="border border-dark">
              User Name
            </th>
            <th scope="col" className="border border-dark">
              Email
            </th>
            <th scope="col" className="border border-dark">
              Order Details
            </th>
            <th scope="col" className="border border-dark">
              status
            </th>
          </tr>
        </thead>
        {booked.length &&
          booked.map((item, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row">
                  <input type="checkbox" />
                </th>

                <td>{item.username}</td>
                <td>{item.email}</td>

                <td className="text-center">
                  <button
                    className="btn btn-sm btn-rounded btn-outline-info"
                    onClick={(e) => handelDetails(item._id)}
                    id="myBtn"
                  >
                    Oders
                  </button>
                </td>
                <td>
                  <select className="mx-4">
                    <option>{item.status}</option>
                  </select>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
      <div className="row">
        <div className="col-sm-6">
          <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Customer Orders</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>_id</th>
                    <th>Email</th>
                    <th>USer name</th>
                    <th>Products</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {seprateValue.length &&
                  seprateValue.map((items, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{items.title}</td>
                        <td>{items.load}</td>
                        <td>{items.Price}</td>
                      </tr>
                    </tbody>
                  ))}
              </Table>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
