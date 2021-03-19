import React, { useEffect, useState } from 'react'
import "./styles.scss"
import Button from "./../forms/Button"
import FormInput from "./../forms/FormInput"
import { signInWithGoogle, auth} from "./../../firebase/utils"
import AuthWrapper from "./../AuthWrapper"

import {Link} from "react-router-dom"
function SignIn () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [completed, setCompleted] = useState(false)
    const [progress, setProgress] = useState(false)
    const configAuthWrapper ={
        headline: "Login"
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(true)
        try {
            await auth.signInWithEmailAndPassword(email, password);
            
        }catch (err) {
            setErrors(err)
            console.log(err);
        }
        if (!errors) {
            setCompleted(true)
        }
        setProgress(false)

    }
    

    return (
        <AuthWrapper {...configAuthWrapper}>
             <div className="signIn">
                    
                
            {/*    <div className="signIn__wrap">
                    <h2 className="signIn__logo">
                    Login
                    </h2>
                    <hr/> */}
                    <div className="signIn__formWrap">
                        {progress ? <h5 className='error'>Loading</h5> : ( <h5 className='error'>{errors.message}</h5>)}
                   
                        <form onSubmit={handleSubmit} action="">
                            <FormInput 
                                label="Email"
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormInput
                                label="Password" 
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="signIn__socialSignIn">
                                <div className="signIn__row">
                                    <Button type="submit" >
                                        {completed ? "Logged" : (
                                            <div className="">{progress ? "Loading" : "Login"}</div>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <div className="signIn__socialSignIn">
                                <div className="signIn__row">
                                    <Button onClick={signInWithGoogle}>
                                        Sign in with Google
                                    </Button>
                                </div>
                            </div>
                            <div className="signIn__socialSignIn">
                                <div className="signIn__row">
                                    <div className="error">
                                        <Link  to="/recovery">
                                            Reset Password
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="signIn__socialSignIn">
                                <div className="signIn__row">
                                    <div className="error">
                                        <Link  to="/phonelogin">
                                           Login with phone number
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                {/* </div> */}
            </div> 
        </AuthWrapper>
    )
}

export default SignIn
