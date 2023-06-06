import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import {  useNavigate} from 'react-router-dom'
import './Dashboard.css'




const Dashboard = ()=>{
    const navigate= useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')

   function Logout(){
    localStorage.removeItem("token");
    window.location.href='/login'

   }
 

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const user = jwt_decode(token)
        setName(user.name)
        setEmail(user.email)
        console.log(user)
    },[])
   
console.log('name and email',name)

    function Movetoedit(){
       navigate('/edit')
    }


  
    return(
        
       
        <div className="container">
            <div className="header">
            <h1 >user profile</h1>
            <button onClick={Movetoedit}>edit Profile of {name}</button>
            <button onClick={Logout} style={{width:'70px',height:'auto'}}>Logout</button>
            </div>
            <br></br>
            
            <div className="image">
            <img src={`http://localhost:3001/uploads/${name}.png`} alt="profile image" style={{width:'200px',height:'auto'}}></img>
            </div>
            <h3>Name : {name}</h3>
            
            <h3>Email : {email}</h3>
           
          
        </div>
       
        
    )
}


export default Dashboard