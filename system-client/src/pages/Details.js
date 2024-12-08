import { useEffect, useState } from "react"

import '../styles/Details.css'

export default function Details() {

    const [email, setEmail]             = useState("")
    const [firstName, setFirstName]     = useState("");
    const [middleName, setMiddleName]   = useState("");
    const [lastName, setLastName]       = useState("");
    const [isAdmin, setIsAdmin]         = useState(false);

    const fetchDetails = () => {
        fetch('http://localhost:4000/users/details', {
            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(result => result.json())
        .then(data => {
            if (data.code === "USER-FOUND") {
                console.log(data)
                // console.log(data.code)
                // console.log(data.result._id)
                setEmail(data.result.email);
                setFirstName(data.result.firstName);
                setMiddleName(data.result.middleName);
                setLastName(data.result.lastName);
                setIsAdmin(data.result.isAdmin);
            } else {

            }
        })
    }

    useEffect(() => {
        fetchDetails();
    },[])

    return(
        <div className="details-container">
            <header className="details-header">
                <h1>Your Profile</h1>
            </header>

            <section>
                <div className="details-img">
                    <img src="./UA-Logo-2.jpg"></img>
                </div>

                <div className="details-content">
                    <p className='details-content-header'>Email</p>
                    {email ? <p>{email}</p> : <p>...</p>}

                    <p className='details-content-header'>First name</p>
                    {firstName ? <p>{firstName}</p> : <p>N/A</p>}

                    <p className='details-content-header'>Middle name</p>
                    {middleName ? <p>{middleName}</p> : <p>N/A</p>}

                    <p className='details-content-header'>Last name</p>
                    {lastName ? <p>{lastName}</p> : <p>N/A</p>}

                    <p className='details-content-header'>Admin rights</p>
                    {isAdmin ? <p>Admin</p> : <p>Not admin</p>}
                </div>
            </section>
        </div>
    )
};
