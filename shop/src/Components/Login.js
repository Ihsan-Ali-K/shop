import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken)
            const authToken = localStorage.getItem('token');
            console.log("TokenINLogin:", authToken);
            navigate("/");
        }
    }
const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]:e.target.value})

}

    return (
        <>
        <Navbar />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password'
                        placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login