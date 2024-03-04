import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';


const Signup = () => {
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "" })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email,password })
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
      localStorage.setItem('token',json.authToken)
      navigate("/");
  }
  
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" name='name' onChange={onChange} id="name" required/>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email"  onChange={onChange} name='email' aria-describedby="emailHelp" required />
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" onChange={onChange} name='password' required minLength={5} />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form></div>
  )
}

export default Signup