import React, { useState, useEffect } from 'react'
import "./styles.scss"
// Redux
import {useDispatch, useSelector} from 'react-redux'
import {signUpUser, resetAllAuhtForms} from './../../redux/User/user.actions'

// React router
import {withRouter} from 'react-router-dom'
 
// Components
import FormInput from "./../forms/FormInput"
import Button from './../forms/Button';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
    signUpSuccess:user.signUpSuccess,
    signUpError:user.signUpError
})

// Firebase
// import {auth, handleUserProfile} from "./../../firebase/utils"


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

    // Redux
    const dispatch = useDispatch();
    const {signUpSuccess, signUpError} = useSelector(mapState)

    // to define a header
    const configAuthWrapper = {
        headline:"Registration"
    }

    useEffect(() => {
        if (signUpSuccess){
            resetForm();
            dispatch(resetAllAuhtForms())
            props.history.push('/'); 
        }
    }, [signUpSuccess])
    
    useEffect(() => {
        if (signUpError){
            setErrors(signUpError);
        }
        
    }, [signUpError])

    // reset a form
    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setProgress(false);
    }

    // to Define a submit function
    const handleSubmit = e => {
        e.preventDefault();
        setProgress(true)
        dispatch(signUpUser({
            displayName,
            email,
            password,
            confirmPassword
        }))
        setProgress(false)

    }
    return (
       
            <AuthWrapper {...configAuthWrapper}>
                
                <div className="signUp__formWrap">
                    {/* {errors ? <h5>{errors}</h5> : <h5></h5>} */}
                    {progress ? <h5 className='error'>Loading</h5> : ( <h5 className='error'>{errors}</h5>)}
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
