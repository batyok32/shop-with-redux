import React, {useState} from 'react'
import "./styles.scss"

// React Router
import {useHistory, withRouter} from "react-router-dom"

// Components
import AuthWrapper from "./../AuthWrapper"
import FormInput from "./../forms/FormInput"
import Button from "./../forms/Button"

// Firebase
import {auth} from "./../../firebase/utils"

function EmailPassword() {
    //input fields
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState([]);
    const [progress, setProgress] = useState(false)
    
    const history =useHistory();

    // To define header
    const configAuthWrapper = {
        headline:'Email Password'
    }

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(true)

        try {
            const config = {
                url: "http://localhost:3000/login"
            }
            await auth.sendPasswordResetEmail(email,config)
            .then(() => {                
                history.push("/login")
                setProgress(false)
            })
            .catch((err) => {
                setErrors(err)
                console.log("error from email Password 1", err);
            })
        }catch (err) {
            setErrors(err)
            console.log("error from email Password 2", err);
        }
        setProgress(false)
    }
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    {errors ? (<h5 className='error'>{errors.message}</h5>) : (<h5 className='error'></h5>)}
                    <FormInput 
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
    
                    <div className="signIn__socialSignIn">
                        <div className="signIn__row">
                            <Button type="submit">
                            {progress ? "Loading" : "Email Password"}                               
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default withRouter(EmailPassword)
