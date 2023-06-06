import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from "./pages/Dashboard";
import './App.css';
import Edit from './pages/Edit'
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEdit from "./pages/AdminEdit";




const App = () =>{
    return <div className="App">
        
            <BrowserRouter>
            <Routes>
            <Route path="/login" exact element={< Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/edit" exact element={<Edit />} />
            <Route path='/adminLogin' exact element={<AdminLogin />} />
            <Route path='/adminDashboard' exact element={<AdminDashboard />} />
            <Route path='/adminEdit/:id' exact element={<AdminEdit />} />

            </Routes>
            </BrowserRouter>
         
        </div>

    
}

export default App