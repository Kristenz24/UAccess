import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

import useDisableScrollbar from "../utils/useDisableScrollbar";


import '../styles/Login.css'

export default function Login() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	const { user, setUser } = useContext(UserContext);

	function loginUser(e) {
		e.preventDefault();

		fetch("http://localhost:4000/users/login", {
			method: "POST",
			headers: { "Content-Type" : "application/json" },
			body: JSON.stringify({
				email		: email,
				password	: password
			})
		})
		.then(result => result.json())
		.then(result => {
			if(result.token) {
				Swal.fire({
					title: "LOGIN SUCCESS!",
					text: "You can now use our enrollment system",
					icon: "success"
				})

				if(typeof result.token !== 'undefined') {
					localStorage.setItem('token', result.token);
					retrieveUserDetails(result.token);
				}

			} else if (result.code === 'USER-NOT-REGISTERED') {
				Swal.fire({
					title: "YOU ARE NOT REGISTERED",
					text: "Please register to login",
					icon: "warning"
				})
			} else {
				Swal.fire({
					title: "INCORRECT PASSWORD!",
					text: "Please try again",
					icon: "error"
				})
			}
		})
	}

	const retrieveUserDetails =  (token) => {
		fetch('http://localhost:4000/users/details', {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(data => {
			console.log(data);
			setUser({
				id: data.result._id,
				isAdmin: data.result.isAdmin
			})
		})
	}

	useDisableScrollbar();
      
	return(
		user.id !== null ? <Navigate to="/"/> :
		
		<div className='login-container'>
			<section className='left-section'>
				<img src='UA-BG.png'/>
			</section>

			<section className='right-section'>
				<h1>Login</h1>

				<form className='login-form' onSubmit={e => loginUser(e)}>
					
					<input 
						type='email' 
						placeholder="Email address" 
						onChange={(e) => setEmail(e.target.value)} 
						value={email} 
						required
						maxLength={50}
					/>

					<input 
						type='password' 
						placeholder="Password" 
						onChange={(e) => setPassword(e.target.value)} 
						value={password} 
						required
						maxLength={50}
					/>

					<button type="submit">Login</button>
				</form>
			</section>
		</div>
	)
};
