import React, { useState } from 'react'
import "./styles.scss"
import FormInput from "./../forms/FormInput"
import Button from './../forms/Button';
import {auth, handleUserProfile} from "./../../firebase/utils"


function SignUp() {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [progress, setProgress] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            const err = ['Password don\'t match']
            setErrors(err)
            return
        }
        setProgress(true)
        try {

            const {user}= await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName })
        }catch(err) {

        }
        setProgress(false)

    }
    return (
        <div className="signUp">
            <div className="signUp__wrap">
                <h2>
                    Sign up
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
                <div className="signUp__formWrap">
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
                </div>
            </div>
            
        </div>
    )
}

export default SignUp
