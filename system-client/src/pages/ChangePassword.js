import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2"

import useDisableScrollbar from "../utils/useDisableScrollbar";

import '../styles/ChangePassword.css'

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const { user, setUser } = useContext(UserContext);

    function updateUserPassword(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        
        fetch('http://localhost:4000/users/change-password',{
            method: "PUT",
            headers: { 
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                confirmNewPassword: confirmNewPassword,
                newPassword: newPassword
            })
        })
        .then(result=>result.json())
        .then(data=>{
            if(data.code === 'PASSWORD-UPDATED-SUCCESSFULLY'){
                Swal.fire({
                    title: "PASSWORD UPDATED SUCCESSFULLY!",
                    text: data.message,
                    icon: "success"
                })
                setNewPassword('')
                setConfirmNewPassword('')
                
            } else {
                Swal.fire({
                    title: "SOMETHING WENT WRONG!",
                    text: "Please try again!",
                    icon: "error"
                })
            }
        })      
    }

    useDisableScrollbar();

    return(
        user.id === null ? <Navigate to="/"/> :

        <div className='change-password-container'>
            <header className='change-password-header'>
                <h1>Update your password</h1>
            </header>

            <form className="changePasswordForm" onSubmit={ e => updateUserPassword(e)}>

                <h2>Update Password</h2>
                
                <input 
                    type='text' 
                    placeholder="New Password" 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    value={newPassword} 
                    required
                    maxLength={50}
                />

                <input 
                    type='text' 
                    placeholder="Confirm Password" 
                    onChange={(e) => setConfirmNewPassword(e.target.value)} 
                    value={confirmNewPassword} 
                    required
                    maxLength={50}
                />

                <button type="submit">Change password</button>
            </form>
        </div> 
    )
};
