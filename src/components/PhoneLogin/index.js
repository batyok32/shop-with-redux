import React, { useEffect, useState } from 'react'
import "./styles.scss"
import Button from "./../forms/Button"
import FormInput from "./../forms/FormInput"
import { signInWithGoogle, auth} from "./../../firebase/utils"
import firebase from "./../../firebase/utils"
import AuthWrapper from "./../AuthWrapper"

import {Link} from "react-router-dom"
function PhoneLogin () {
    const [phoneNumber, setPhoneNumber] = useState("+99361000000");
    const [code, setCode] = useState("123456");
    const [errors, setErrors] = useState([]);
    const [completed, setCompleted] = useState(false)
    const [progress, setProgress] = useState(false)
    const [user, setUser] = useState(null)
    const configAuthWrapper ={
        headline: "Login With Phone Number"
    }

    const onSignInSubmit = async () => {
        const recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha).then((confirmationResult) => {
                console.log(confirmationResult, "Confirmation Result")
                setTimeout(()=> {
                    confirmationResult.confirm(code).then((result) => {
                        console.log(result.user);
                        setUser(result.user)
                    }).catch((err) => {
                        console.log(err, "second error");
                    })
                }, 60000)
                
            }
        ).catch((err)=> {
            console.log("First eroor", err);
        }) 
    }
    

    return (
        <AuthWrapper {...configAuthWrapper}>
             <div className="signIn">
                    <div className="signIn__formWrap">
                        {progress ? <h5 className='error'>Loading</h5> : ( <h5 className='error'>{errors.message}</h5>)}
                        {user ? <h1>Signed</h1> : <h1></h1>}
                        <div id="recaptcha-container">

                            </div>
                        <form action="">
                            <FormInput 
                                label="PhoneNumber"
                                type="number"
                                name="phoneNumber"
                                value={phoneNumber}
                                placeholder="Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <FormInput  
                                label="code"
                                type="number"
                                name="code"
                                value={code}
                                placeholder="Code"
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </form>
                        
                            

                        <div className="signIn__socialSignIn">
                                <div className="signIn__row">
                                    <Button >
                                        {completed ? "Logged" : (
                                            <div className="">{progress ? "Loading" : "Fill code"}</div>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        <div className="signIn__socialSignIn">
                                <div className="signIn__row">
                                    <Button onClick={onSignInSubmit}>
                                        {completed ? "Logged" : (
                                            <div className="">{progress ? "Loading" : "Login"}</div>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        
                    </div>
            </div> 
        </AuthWrapper>
    )
}

export default PhoneLogin
