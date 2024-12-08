import '../styles/Banner.css'
import { useNavigate } from "react-router-dom";

export default function Banner() {

    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
      };

    return (
        <section className='banner-container'>
            <div className='banner-text'>
                <h1>UNIVERSITY of the ASSUMPTION</h1>
                <p>UAccess: Offical Online Course Enrollment</p>
            </div>
            <div className='banner-buttons'>
                <button onClick={()=> {handleNavigation('/courses')}}>View Courses</button> 
                <button>Enroll Now</button> 
            </div>
        </section>
    ) 
};
