import { useState, useContext, useEffect } from "react"
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

import useDisableScrollbar from "../utils/useDisableScrollbar";

import '../styles/AddCourse.css'

export default function AddCourse() {
    const [imgLink, setImgLink]             = useState("");
    const [name, setName]                   = useState("");
    const [description, setDescription]     = useState("");
    const [price, setPrice]                 = useState("");
    const [img, setImg]                     = useState("");

    const { user } = useContext(UserContext);

    function addCourse(e) {
        e.preventDefault();

        fetch("http://localhost:4000/courses/", {
            method: "POST",
            headers:  {"Content-Type" : "application/json"},
            body: JSON.stringify({
                imgLink         : imgLink,
                name            : name,
                description     : description,
                price           : price
            })
        })
        .then(result => result.json())
        .then(data => {
            if(data.code === "COURSE-ADDED") {
                Swal.fire({
                    title: "COURSE ADDED!",
                    text: data.message,
                    icon: "success"
                })
                setImgLink("");
                setName("");
                setDescription("");
                setPrice("");
            } else {
                Swal.fire({
                    title: "SOMETHING WENT WRONG!",
                    text: "Please try again!",
                    icon: "error"
                })
            }
        })
    }

    return(
        user.isAdmin === null ? <Navigate to="/"/> :

        <div className="add-course-container">
            <header className="add-course-header">
                <h1>Add New Course</h1>
            </header>

            <section>
                <article className="card">
                    {imgLink ? <img src={imgLink}/> : <img src='./UA-Logo-2.jpg'/>}
                    {name ? <p>{name}</p> : <p>Course Name</p>}
                    {description ? <p>{description}</p> : <p>Course Description</p>}
                    <p>Price</p>
                    {price ? <p>₱ {price}</p> : <p>Course Price</p>}
                    <button>Enroll</button>
                </article>

                <form className="addCourseForm" onSubmit={e => addCourse(e)}>
                    
                    <input 
                        type='text' 
                        placeholder="Image link" 
                        onChange={(e) => setImgLink(e.target.value)} 
                        value={imgLink} 
                        required
					/>

                    <input 
                        type='text' 
                        placeholder="Course name" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        required
					/>

                    <input 
                        type='text' 
                        placeholder="Course description" 
                        onChange={(e) => setDescription(e.target.value)} 
                        value={description} 
                        required
					/>

                    <input 
                        type='number' 
                        placeholder="Course price" 
                        onChange={(e) => setPrice(e.target.value)} 
                        value={price} 
                        required
					/>

                    <button type="submit">Add Course</button>
                </form>
            </section>
        </div>
    )
};
