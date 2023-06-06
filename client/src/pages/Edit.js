import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from 'axios'




function Edit(){
  
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [image,setImage] = useState('')
    console.log(image,'image 13')

   
 

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const user = jwt_decode(token)
        setName(user.name)
        setEmail(user.email)
        console.log('token details',user)
    },[])

    // async function editProfile(e){
    //     e.preventDefault()
    //     console.log('jjjihjh',image);
    //     const formData = new FormData();
       
    //     formData.append('image', image);
    //     formData.append('name',name);
    //     formData.append('email',email);
    //     // const response = await fetch('http://localhost:3001/api/edit',{
    //     //     method:'POST',
    //     //     headers:{
    //     //         'Content-Type':'application/json',
    
    //     //     },
    //     //     // body: JSON.stringify({
    //     //     //     name,
    //     //     //     email,
              
    //     //     // }),
    //     //     formData
    //     // })
    //     const response = await axios.post('http://localhost:3001/api/edit',formData)
    //     const data = await response.json()
    //     console.log('data after edit',data)
    
    //     }

    async function editProfile(e) {
        e.preventDefault();
        console.log('jjjihjh', image);
        const formData = new FormData();
      
        formData.append('image', image);
        formData.append('name', name);
        formData.append('email',email);
        try {
          const response = await axios.put('http://localhost:3001/api/edit', formData,
           {
            headers: {
              'Content-Type': 'multipart/form-data', 
            },
            params: {
              name: name,
            }
          });
          const data = response.data; 
          if(response.status)
          {
          window.location.href='/dashboard'
          }
          console.log('data after edit', data);
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

export default Edit