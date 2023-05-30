import {useState} from 'react'


function App() {

  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  async function LoginUser(event)
  {
    event.preventDefault()
   const response = await fetch('http://localhost:3001/api/login',{
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
    if(data.user)
    {
      localStorage.setItem('token',data.user)
      alert('login succesful')
      window.location.href='/dashboard'
    }
    else{
      alert('please check username and password')
    }
    console.log(data)
  }
  return (
    <div >
      <h1>Login</h1>
      <form onSubmit={LoginUser}>
       
        <input type = 'email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='email' />
        <br/>
        <input type = 'password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
        <br/>
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}

export default App;
