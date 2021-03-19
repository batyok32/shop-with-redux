import React, { useState } from 'react'
import "./styles.scss"

// Components
import Button from "./../forms/Button"
import FormInput from "./../forms/FormInput"
import AuthWrapper from "./../AuthWrapper"


// Firebase
import { signInWithGoogle, auth} from "./../../firebase/utils"

// react router
import {Link, withRouter} from "react-router-dom"


function SignIn (props) {

    // Define react states

    // Used for input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // to define does function ended successfully or not
    const [errors, setErrors] = useState([]);
    const [completed, setCompleted] = useState(false)
    const [progress, setProgress] = useState(false)

    // Define a header
    const configAuthWrapper ={
        headline: "Login"
    }

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors([]);
        setCompleted(true);
        setProgress(false);
    }

    // Define a submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(true)
        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
            props.history.push('/')
        }catch (err) {
            setErrors(err)
            console.log(err, "ERROR from sign in component");
        }
        setProgress(false)

    }
    

    return (
        <AuthWrapper {...configAuthWrapper}>
             <div className="signIn">
                    
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
            </div> 
        </AuthWrapper>
    )
}

export default withRouter(SignIn)
