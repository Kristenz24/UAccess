import { useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import '../styles/Register.css'


export default function Register() {
    const {user} = useContext(UserContext);

    let [firstName, setFirstName]           = useState("");
    let [middleName, setMiddleName]         = useState("");
    let [lastName, setLastName]             = useState("");
    let [email, setEmail]                   = useState("");
    let [contactNumber, setContactNumber]   = useState("");
    let [password, setPassword]             = useState("");

    function register(e) {
        e.preventDefault();

        fetch("http://localhost:4000/users/register", {
            method: 'POST',
            headers: {"Content-Type" :  "application/json"},
            body: JSON.stringify({
                firstName       : firstName,
                middleName      : middleName,
                lastName        : lastName,
                email           : email,
                contactNumber   : contactNumber,
                password        : password
            })
        })
        .then(result => result.json())
        .then(result => {
            if(result.code === "REGISTRATION-SUCCESS"){
                Swal.fire({
                    title: "SUCCESS!",
                    text: result.message,
                    icon: "success"
                })
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setEmail("");
                setContactNumber("");
                setPassword("");
            }else{
                Swal.fire({
                    title: "SOMETHING WENT WRONG!",
                    text: "Please try again",
                    icon: "error"
                })
            }
        })
    }

    return (
        user.id !== null ?
            <Navigate to="/"/>
            :
            <div className="register-container">
                <section className="left-section">
                    <img src='UA-BG.png'/>
                </section>

                <section className="right-section">
                    <h1>Register</h1>

                    <form className="register-form" onSubmit={e => register(e)}>
                        <input 
                            type='text' 
                            placeholder="First name" 
                            onChange={(e) => setFirstName(e.target.value)} 
                            value={firstName} 
                            required
                        />

                        <input 
                            type='text' 
                            placeholder="Middle name" 
                            onChange={(e) => setMiddleName(e.target.value)} 
                            value={middleName} 
                            required
                        />

                        <input 
                            type='text' 
                            placeholder="Last name" 
                            onChange={(e) => setLastName(e.target.value)} 
                            value={lastName} 
                            required
                        />

                        <input 
                            type='email' 
                            placeholder="Email address" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            required
                        />

                        <input 
                            type='number' 
                            placeholder="Contact number" 
                            onChange={(e) => setContactNumber(e.target.value)} 
                            value={contactNumber} 
                            required
                        />

                        <input 
                            type='password' 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            required
                        />

                        <button type="submit">Register</button>
                    </form>
                </section>
            </div>
      )
};
