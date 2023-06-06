import { useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";


function AdminEdit(){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [image,setImage] = useState('')

    const { id} = useParams()


    async function editProfile(e) {
        e.preventDefault();
        
        const formData = new FormData();
      
        formData.append('image', image);
        formData.append('name', name);
        formData.append('email',email);
        try {
          const response = await axios.put(`http://localhost:3001/api/adminEdit/${id}`, formData,
           {
            headers: {
              'Content-Type': 'multipart/form-data', 
            }
          });
          const data = response.data; 
          console.log('data after edit', data);
         if(data.status)
          {
            window.location.href='/adminDashboard'
          }
        } catch (error) {
          console.log('error is', error);
        }
      }


    return (
       
        <div className="container">
            <h1>Edit Profile</h1>
            <form onSubmit={editProfile} encType="multipart/form-data">
                <label htmlFor="name">Name </label><br/>
                <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/><br/>
                <label htmlFor="email">Email</label><br/>
                <input type="text"  name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
                <label htmlFor="" >Image</label><br/>
                <input type='file' onChange={(e)=>setImage(e.target.files[0])} name="image"/><br/>

                <input type="submit" value='submit'></input>
            </form>
        </div>
        
        
    )
}

export default AdminEdit