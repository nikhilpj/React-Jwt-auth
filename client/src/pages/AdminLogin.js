import { useState } from "react"


function AdminLogin(){
    const [email,setEmail]= useState('')
    const [password,setPassword] = useState('')

    async function adminLogin(event){
        event.preventDefault()
        const response = await fetch('http://localhost:3001/api/adminlogin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
        
                email,
                password
              })
        })
        const data = await response.json()
        console.log(data)
        if(data.status=='ok')
        {
            window.location.href='/adminDashboard'
        }
        else{
            alert('please check the name and password')
        }
    }

    return(
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <form onSubmit={adminLogin}>
                <h1 >Admin Login</h1>
                <label htmlFor="email" >Email</label><br/>
                <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} style={{width:'300px',height:'23px'}}/><br/><br/>
                <label htmlFor="password">password</label><br/>
                <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} style={{width:'300px',height:'23px'}} /><br/>
                <input type="submit" value='submit' style={{alignItems:'center'}}/><br/>
            </form>
        </div>
    )

}
export default AdminLogin