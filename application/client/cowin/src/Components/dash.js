import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Dash() {

    return (
        < div>
            < div className="card banner-card" >
                <div className="row">
                    <h3 style={{ color: "red" }}><center><strong><u>COWIN NOTIFIER</u></strong></center></h3>

                    <Link to='/' style={{ display: 'flex', textDecoration: "none" }}><button type="button" class="btn btn-success">LOG OUT</button></Link>

                </div>
            </div>
            <div><form action="http://localhost:5000/user" method="POST" >
                
                <input name="pin" placeholder="pin"></input>
                <input email="confirm your mail" placeholder="reenter your email" name="email"></input>
                <button>Get Details</button>


            </form></div>
        </div >
    )
}
export default Dash