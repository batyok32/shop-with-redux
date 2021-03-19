import React, { useState } from 'react'
import "./styles.scss"

// Components
import Button from "./../forms/Button"
import FormInput from "./../forms/FormInput"
import AuthWrapper from "./../AuthWrapper"

// Firebase
// import { auth} from "./../../firebase/utils"
import firebase from "./../../firebase/utils"


function PhoneLogin () {

    // Form inputs
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [code, setCode] = useState('');

    // to define does function ended successfully or not
    const [errors, setErrors] = useState([]);
    const [completed, setCompleted] = useState(false)
    const [progress, setProgress] = useState(false)



    // To define a header
    const configAuthWrapper ={
        headline: "Login With Phone Number"
    }

    // const confirm = async () => {
    //     onSignInSubmit.then((confirmationResult) => {
    //         console.log(confirmationResult, "Confirmation Result")
            
    //         confirmationResult.confirm(code).then((result) => {
    //             console.log("SUUCCCESSS", result.user);
    //         }
            
    //         ).catch((err) => {
    //             setErrors(err)
    //             console.log(err, "second error");
    //         })
    //         setTimer(false)
    //     }
    //     ).catch((err)=> {
    //         setErrors(err)
    //         console.log("First eroor", err);}
    //     ) 
    // setTimer(false)
        
    // }
    // submit
    const onSignInSubmit = async (e) => {
        e.preventDefault();
        setProgress(true)
        console.log("Captcha started");
        const recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha).then((confirmationResult) => {
            console.log(confirmationResult, "Confirmation Result")
            const code = prompt("ENter a code>>> ")
            confirmationResult.confirm(code).then((result) => {
                console.log("SUUCCCESSS", result.user);
                
            }).catch((err) => {
                setErrors(err)
                console.log(err, "second error");
            })
        }).catch((err)=> {
            setErrors(err)
            console.log("First eroor", err);}
        ) 
    }
    
    

    return (
        <AuthWrapper {...configAuthWrapper}>
             <div className="signIn">
                    <div className="signIn__formWrap">
                        {errors ? <h5>{errors.message}</h5>: (<h5></h5>)}
                        {progress ? <h5 className='error'>Loading</h5> : ( <h5 className='error'>{errors.message}</h5>)}
                        <div id="recaptcha-container"></div>
                        {/* {timer ? <h5>Set code</h5> : <h5>Not set code</h5>} */}
                        <form onSubmit={onSignInSubmit} action="">
                            <FormInput 
                                label="PhoneNumber"
                                type="number"
                                name="phoneNumber"
                                value={phoneNumber}
                                placeholder="Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {/* <FormInput  
                                display={timer ? 'block':'none'}
                                label="code"
                                type="number"
                                name="code"
                                value={code}
                                placeholder="Code"
                                onChange={(e) => setCode(e.target.value)} */}
                            {/* /> */}
                            <div className="signIn__socialSignIn">
                                <div className="signIn__row">
                                    <Button>
                                        {completed ? "Logged" : (
                                            <div className="">{progress ? "Loading" : "Login"}</div>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            {/* <div className="signIn__socialSignIn">
                                <div className="signIn__row">
                                    <Button onClick={confirm}>
                                        {completed ? "Logged" : (
                                            <div className="">{progress ? "Loading" : "Fill code"}</div>
                                        )}
                                    </Button>
                                </div>
                            </div> */}
                        </form>
                        
                            

                        
                        
                        
                    </div>
            </div> 
        </AuthWrapper>
    )
}



export default PhoneLogin
