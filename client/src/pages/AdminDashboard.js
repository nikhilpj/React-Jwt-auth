import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



function AdminDashboard(){
     let usersData = []

    const [data ,setData] = useState([])
    

async function getDetails()
{
   
    const req= await fetch('http://localhost:3001/api/adminDashboard',{
    method:'GET',
    headers:{
        'Content-Type':'application/json' // e.preventDefault()
    }
    })
     usersData = await req.json() 
    setData(usersData.data)
    console.log('data from database',usersData)
}
function logout(){
    window.location.href='/adminLogin'
}

async function deleteItem(id)
{
    const confirmDelete = window.confirm('are you sure ,you want to delete this item')
    if(confirmDelete)
    {
      let res =  await fetch(`http://localhost:3001/api/adminDashboard/${id}`,{
            method:'GET',
            headers:{
                "Content-Type": "application/json"
            }
        })
        console.log(res,"this is the response after deleting")
        if(res.status==200)
        {
            alert('item deleted ')
            getDetails()
        }
    }

   
}

async function editItem(id)
{

}


useEffect(()=>{
  getDetails()
},[])
    return(
        <div style={{border:'1px solid black',width:'50%',padding:'5px',margin:'5px',justifyContent:'space-between'}}>
           < div >
            <h1 >admin Dashboard</h1>
            <button onClick={logout}>logout</button>
            </div>
            <br/>
        <div >
            
            <table >
                <thead>
        <tr>
        <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th >Action</th>
            
        </tr>
        </thead>
        <tbody>

       {data.map((item)=>(

        <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td >
            <Link to={`/adminEdit/${item._id}`}>
            <button >Edit</button>
            </Link>
            <button  onClick={()=>deleteItem(item._id)}>Delete</button>
            </td>
        </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div>
    )
}
export default  AdminDashboard