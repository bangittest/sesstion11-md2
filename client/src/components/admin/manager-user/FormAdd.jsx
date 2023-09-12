import React, { useState } from "react";
import "./form.css";
import axios from "axios";
import { notification } from "antd";

export default function FormAddUser({ handleCloseForm, loadData }) {
  const [gender, setGender] = useState(0);

  const [user, setUser] = useState({
    user_name: "",
    address: "",
    dateOfBirthday: "",
    email: "",
    password: "",
  });

  //danh sach gender
  const listGender = [
    {
      id: 0,
      title: "Nam",
    },
    {
      id: 1,
      title: "Nữ",
    },
    {
      id: 2,
      title: "khac",
    },
  ];

  // ham on change
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    //bao luu tat ca cac gia tri cua user
    setUser({
      ...user,
      [name]: value,
    });
  };

  //ham them user
  const handleOnsubmit = (e) => {
    e.preventDefault();
  
    axios
      .post("http://localhost:8000/users", user) // Specify the correct API endpoint
      .then((response) => {
        if (response.data.state === 201) {
          //hien thi thanh cong
          //an form
          notification.success({
            message: "thành công",
            description: "thêm mới user thành công",
          });
          
        }
        handleCloseForm();
          loadData();
      })
      .catch((error) => {
        // Handle any errors here, e.g., display an error message
        console.error("Error:", error);
      });
  };
  return (
    <>
      <div className="container-1">
        <form onSubmit={handleOnsubmit} className="form-container">
          <div className="d-flex align-items-center justify-content-between">
            <h3>Thêm mới tài khoản</h3>
            <button
              onClick={handleCloseForm}
              type="button"
              className="btn btn-secondary"
            >
              X
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">Tên</label>
            <input name="user_name" type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Giới tính</label>
            <div className="d-flex gap-3">
              {listGender.map((genders) => (
                <div key={genders.id} className="form-check">
                  <input
                    checked={genders.id === gender}
                    onChange={() => setGender(genders.id)}
                    className="form-check-input"
                    type="radio"
                    name="gender"
                  />
                  <label className="form-check-label">{genders.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Ngày sinh</label>
            <input
              name="dateOfBirthday"
              onChange={handleOnChange}
              type="date"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <input
              name="address"
              onChange={handleOnChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              onChange={handleOnChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              name="password"
              onChange={handleOnChange}
              type="password"
              className="form-control"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <button
              onClick={handleCloseForm}
              type="submit"
              className="btn btn-secondary"
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
