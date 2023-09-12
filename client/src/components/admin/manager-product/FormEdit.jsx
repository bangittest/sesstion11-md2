import React, { useEffect, useState } from "react";
import './product.css'
import { notification } from "antd"

export default function FormEdit({
    idEdit,
    loadData,
    handleCloseFormEdit,
}) {
    console.log(idEdit);

    const [product, setProduct] = useState({
        product_name: '',
        price: 0,
        from: ''
      })
      

      //goi ham call API lay thong tin san pham theo id
      useEffect(()=>{
        // call API
        fetch(`http://localhost:8000/products/${idEdit}`)
        .then(response => response.json())//ep kieu du lieu
        .then((response)=>setProduct(response))
        .catch((error)=>console.log(error))
      },[])
      console.log(product);
     
      //  ham lay gia tri tu cac o input
      const handleChange = (e) => {
        const { value, name } = e.target
        // bao luu tat ca gia tri cua product
        setProduct({
          ...product,
          [name]: value,
        })
      }
    
      // ham cap nhat product
      const handleSubmit = (e) => {
        e.preventDefault()
        // goi API cap nhat
        fetch(`http://localhost:8000/products/${idEdit}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'  // ep kieu du lieu dau vao tu js sang json
          },
          body: JSON.stringify(product),
        })
          .then((response) => {
            // kiem tra du lieu tra ve
            if (response.status === 200) {
              // hien thi notifycation thanh cong
              // an form them moi
              notification.success({
                message: "thanh cong",
                description: ' cap nhat san pham thanh cong'
                
              });
              loadData()
              handleCloseFormEdit()
              
            }
          })
          .catch((error) => console.log(error))
      }
  return (
    <div>
         <div className="product-container">
        <form
          onSubmit={handleSubmit}
          className="form-container">
          <div className="mb-3">
            <label htmlFor="product_name" className="form-label">
              Tên sản phẩm
            </label>
            <input
            value={product.product_name}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="product_name"
              name="product_name" />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Giá
            </label>
            <input
            value={product.price}
              onChange={handleChange}
              type="number"
              className="form-control"
              id="price"
              name="price" />
          </div>
          <div className="mb-3">
            <label htmlFor="from" className="form-label">
              Xuất xứ
            </label>
            <input
            value={product.from}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="from"
              name="from" />
          </div>
          <div className="d-flex gap-3 justify-content-center">
            <button
              type="submit"
              className="btn btn-primary">
              Cap nhat
            </button>
            <button onClick={handleCloseFormEdit}
              type="button"
              className="btn btn-danger">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
