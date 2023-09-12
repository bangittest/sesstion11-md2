import React, { useEffect ,useState} from "react";
import axios from "axios";//khong co ngoac nhon
import { notification } from "antd";
import FormAdd from "../../components/admin/manager-user/FormAdd";
import FormEdit from "../../components/admin/manager-user/FormEdit";

export default function ListUser() {
    const [user,userState]=useState([])
    const[showForm,setShowForm]=useState(false)
    const[showFormEdit,setShowFormEdit]=useState(false)
    const[idEdit,setIdEdit]=useState(null)
    //goi ham lay thong tin tat ca user
    const loadData=()=>{
        axios.get(`http://localhost:8000/users`)
        .then(respone=>userState(respone.data))
        .catch(error=>console.log(error.data))
    }

    useEffect(()=>{
        loadData();
    },[])

    //ham xoa
    const handleDelete=(id)=>{
        //goi API
        axios.delete(`http://localhost:8000/users/${id}`)
       .then(respone=>{
        if(respone.data.status===200){

            notification.success({
                message:"thanh cong",
                description:"xoa tai khoan thanh cong"
                
            })
            
        }
        loadData()

       })
       .catch(error=>console.log(error))
    }
    //show form
    const handleShowForm=()=>{
        setShowForm(true)
    }
    const handleCloseForm=()=>{
        setShowForm(false)
    }

    //show form edit  setIdEdit hung luon id
    const showEdit=(productId)=>{
      setShowFormEdit(true)
      setIdEdit(productId)
    }
    const closeEdit=()=>{
      setShowFormEdit(false)
    }
  return (
    <>
    {showFormEdit&&<FormEdit closeEdit={closeEdit} idEdit={idEdit} loadData={loadData} />}
    {showForm && <FormAdd handleCloseForm={handleCloseForm} loadData={loadData}/>}
      <div className="container mt-5">
        <button onClick={handleShowForm} className="btn btn-primary mb-3">Them moi tai khoan</button>
        <table className="table border-primary table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Giới tính</th>
              <th>nam sinh</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
           {
            user.map((user,index)=>(
                <tr key={user.id}>
                <td>{index}</td>
                <td>{user.user_name}</td>
                <td>{user.gender===0? "nam":"nu"}</td>
                <td>{user.dateOfBirthday}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td><button onClick={showEdit} className="btn btn-warning">sua</button></td>
                <td><button onClick={()=>handleDelete(user.id)}  className="btn btn-denger">xoa</button></td>
              </tr>
            ))
           }
          </tbody>
        </table>
      </div>
    </>
  );
}