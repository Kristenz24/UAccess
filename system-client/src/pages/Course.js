import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import '../styles/Course.css'


export default function Course() {
    const [courses, setCourses] = useState([]);

    const fetchCourses = () => {
        fetch("http://localhost:4000/courses/all/active", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(result => result.json())
        .then(data => {
            console.log(data);
            if(data.code === "ALL-ACTIVE-COURSES-RESULT") {
                setCourses(data.result.map(data => {
                    return(
                        <CourseCard key={data._id} coursesData={data} />
                    )
                }))
            } else {
                setCourses([]);
            }
        })
    }

    console.log(courses);

    useEffect(()=>{
        fetchCourses();
    }, [])

    return(
        <div className="course-container">
            <header className="course-header">
                <h1>List of our Available Courses</h1>
            </header>

            <section className="course-card-container">
                {courses}
            </section>
        </div>
      )
};
