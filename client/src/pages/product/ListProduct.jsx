import React, { useEffect, useState } from "react";
import { formatMoney } from "../../utils/fomatData";
import FormAdd from "../../components/admin/manager-product/FormAdd";
import FormEdit from "../../components/admin/manager-product/FormEdit";

export default function ListProduct() {
  const [products, setProduct] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  //goi API lay thong tin tat ca san pham
  const loadData = () => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json()) //ep kieu du lieu
      .then((response) => setProduct(response)) //noi co du lieu tra ve
      .catch((error) => console.log(error)); //bat loi
  };

  useEffect(() => {
    loadData();
  }, []);

  // hàm xóa
  /**
   *  hàm xóa thông tin products theo id
   * @param {*} id id của product cần xóa
   */
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  //ham thi form them moi san pham
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleEdit = (productId) => {
    setShowFormEdit(true); //hien thi form edit
    setIdEdit(productId); //lay ra id can edit
  };

  //dong form edit
  const handleCloseFormEdit = () => {
    setShowFormEdit(false);
  };
  return (
    <>
      {showForm && (
        <FormAdd handleCloseForm={handleCloseForm} loadData={loadData} />
      )}

      {/* form su thong tin san pham */}
      {showFormEdit &&<FormEdit idEdit={idEdit} handleCloseFormEdit={handleCloseFormEdit} loadData={loadData} />}
      <div className="container">
        <div>
          <button onClick={handleShowForm} className="btn btn-primary">
            Them moi san pham
          </button>
        </div>
        <table border={1} className="table border-primary table-bordered">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">ten san pham</th>
              <th scope="col">Gia</th>
              <th scope="col">Xuat xu</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr scope="row" key={product.id}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{formatMoney(product.price)}</td>
                <td>{product.from}</td>
                <td>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="btn btn-warning"
                  >
                    Sua
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-danger"
                  >
                    xoa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
