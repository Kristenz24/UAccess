import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import useDisableScrollbar from '../utils/useDisableScrollbar';

import '../styles/Banner.css'

export default function Banner() {
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
      };

    useDisableScrollbar();

    return (
        <section className='banner-container'>
            <div className='banner-text'>
                <h1>UNIVERSITY of the ASSUMPTION</h1>
                <p>UAccess: UA Online Course Enrollment</p>
            </div>
            <div className='banner-buttons'>
                <button onClick={()=> {handleNavigation('/courses')}}>View Courses</button> 
                <button>Enroll Now</button> 
            </div>
        </section>
    ) 
};
