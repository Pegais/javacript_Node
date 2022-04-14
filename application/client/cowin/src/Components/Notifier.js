import Axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

function Notifier() {
    const [lister, setLister] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:5000/users").then((response)=>{
            setLister(response.data)
        })
    }, [])
    return (
        < div>
            < div className="card banner-card" >
                <div className="row">
                    <h3 style={{color:"red"}}><center><strong><u>COWIN NOTIFIER</u></strong></center></h3>
                    <Link to='/' style={{ display: 'flex', textDecoration: "none" }}><button type="button" class="btn btn-success">LOG OUT</button></Link>

                </div>
            </div>
            <div >
                <table className="table table-success table-striped" style={{ width: "70rem", margin: "7.5rem" }}>

                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Center</th>
                            <th scope="col">Vaccine_Name</th>
                            <th scope="col">Dose1</th>
                            <th scope="col">Dose2</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            lister.map((value)=>{
                                return(
                                    <tr>
                                        <th>{value.Date}</th>
                                        <th>{value.Centre}</th>
                                        <th>{value.vaccine_name}</th>
                                        <th>{value.dose1}</th>
                                        <th>{value.dose2}</th>
                                        <th>{value.total}</th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
        </div >
    )
}
export default Notifier