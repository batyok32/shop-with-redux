import React, { useState } from 'react'
import "./styles.scss"

// React router
import {withRouter} from 'react-router-dom'
 
// Components
import FormInput from "./../forms/FormInput"
import Button from './../forms/Button';
import AuthWrapper from '../AuthWrapper';

// Firebase
import {auth, handleUserProfile} from "./../../firebase/utils"


function SignUp(props) {
    // React state
    // used for form
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // To define does function ended successfully or not
    const [errors, setErrors] = useState([]);
    const [progress, setProgress] = useState(false)

    // to define a header
    const configAuthWrapper = {
        headline:"Registration"
    }

    // reset a form
    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setProgress(false);
    }

    // to Define a submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validating form
        if (password !== confirmPassword) {
            const err = ['Password don\'t match']
            setErrors(err)
            return
        }

        setProgress(true)
        try {
            const user = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName })
            resetForm();
            props.history.push('/')
        }catch(err) {
            // catched error
            setErrors(err);
        }
        // Function ended
        setProgress(false);

    }
    return (
       
            <AuthWrapper {...configAuthWrapper}>
                
                <div className="signUp__formWrap">
                    {progress ? <h5 className='error'>Loading</h5> : ( <h5 className='error'>{errors.message}</h5>)}
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
                            {progress ? "Loading" : "Register"}
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
            
    )
}

export default withRouter(SignUp)
