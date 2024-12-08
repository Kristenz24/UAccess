import { useState } from "react";
import '../styles/CourseCard.css'

export default function CourseCard({coursesData}) {
    const {_id, imgLink, name, description, price} = coursesData;
    return(
        <article className="card">
            {imgLink ? <img src={imgLink}/> : <img src='./UA-Logo-2.jpg'/>}
            {name ? <p>{name}</p> : <p>Course Name</p>}
            {description ? <p>{description}</p> : <p>Course Description</p>}
            <p>Price</p>
            {price ? <p>₱ {price}</p> : <p>Course Price</p>}
            <button>Enroll</button>
        </article>
    )
};
