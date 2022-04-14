import React, { useState, useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';


// import { UserContext } from '../App';




// import React, { Component } from 'react'

function Login() {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [age, setAge] = useState('')
    // const [list1, setLoginList] = useState([])
    // const [token,setToken]= useState();


    // // using use UseEffect()

    // // using axios to post the data after signing up on frontend to database;
    // const LoginBtn = () => {
    //     Axios.post("http://localhost:5000/userAuth", {
    //         
    //         // })
    //     })




    return (
        <div className="card-cowin">


            <div class="card-group col" id="cardid1">
                <div class="card card-contain border-right-0 mt-6" style={{ padding: "2rem", marginTop: "10rem" }}>
                    <div class="card-body">
                        <img src="data:image/jpeg;base64,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" class="card-img-top" alt="..." />
                        <h5 class="card-title">COWIN VACCINATION HELPER</h5>
                        <p >Please LOGIN on the application to get notified for ongoing vaccination drive. </p>
                        <div class="input-group mb-3">

                        </div>

                    </div>
                </div>
                <div class="card card-contain " style={{ padding: "2rem", marginTop: "10rem" }}>
                    {/* <img src="..." class="card-img-top" alt="..."> */}
                    <div class="card-body">
                        <h5 class="card-title">COWIN HELPER</h5>
                        <div class="input-group mb-3">
                            <div className="input-group mb-3 input-btn ">
                                <form action="http://localhost:5000/userAuth" method="POST">
                                    <div>
                                        <input type="email" class="form-control" placeholder="USER EMAIL" aria-label="Recipient's username" aria-describedby="button-addon2" name="email" />
                                    </div>
                                    <div>
                                        <input type="password" class="form-control" placeholder="USER PASSWORD" ar0ia-label="Recipient's username" aria-describedby="button-addon2" name="password" />
                                    </div>

                                    {/* <div>
                                        <input type="number" class="form-control" placeholder="AGE" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => { setAge(e.target.value) }} />
                                    </div> */}
                                <div>
                                <button class ="btn btn-primary btn-lg" style={{ width: '100%', display: "flex", justifyContent: "center" }} type ="submit" id="button-addon2" >LOGIN</button>
                            </div>
                                </form>
                            </div>


                        </div>
                        <div >
                            <div className="btn-class">
                                <span>
                                <Link to='/signup' style={{ display: 'flex', textDecoration: "none" }}><button type ="button" class ="btn btn-primary btn-lg" style={{ width: '100%', display: "flex", justifyContent: "center" }} >SIGN UP</button></Link>

                        </span>
                    </div>
                </div>                </div>
        </div>

                {/* {list1.map((val) => {
                    console.log(val.email)
                    return val.email
                })} */}
            </div >

        </div >

    )

}
export default Login;
