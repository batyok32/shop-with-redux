import React, { useState } from 'react'
import "./styles.scss"
import Button from "./../forms/Button"
import FormInput from "./../forms/FormInput"
import { signInWithGoogle, auth} from "./../../firebase/utils"


function SignIn () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [progress, setProgress] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(true)
        try {
            await auth.signInWithEmailAndPassword(email, password);
            
        }catch (err) {
            // console.log(err);
        }

    }

    return (
        <div className="signIn">
            <div className="signIn__wrap">
                <h2>
                   Login
                </h2>
                {progress && (
                    <h1>Loadding</h1>
                )}
                {errors.length > 0 && (
                    <ul className="signUp__errors">
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            )
                        })}
                    </ul>
                )}
                <div className="signIn__formWrap">
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
                                    Login
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
                    </form>
                </div>
                {/* <div className="signUp__formWrap">
                    <form onSubmit={handleSubmit} action="">
                        <FormInput 
                            label="Full Name"
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full Name"
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
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
                        <FormInput 
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Button style={{marginTop:15}} type="submit" >
                            Register
                        </Button>
                    </form>
                </div> */}
            </div>
            
        </div>
        
    )
}

export default SignIn
