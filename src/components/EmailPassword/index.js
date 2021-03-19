import React, {useState} from 'react'
import "./styles.scss"
import {useHistory, withRouter} from "react-router-dom"

import AuthWrapper from "./../AuthWrapper"
import FormInput from "./../forms/FormInput"
import Button from "./../forms/Button"

import {auth} from "./../../firebase/utils"

function EmailPassword() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [completed, setCompleted] = useState(false)
    const [progress, setProgress] = useState(false)
    const history =useHistory();
    const configAuthWrapper = {
        headline:'Email Password'
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(true)

        const config = {
            url: "http://localhost:3000/login"
        }

        try {
            await auth.sendPasswordResetEmail(email,config)
            .then(() => {                
                history.push("/login")
            })
            .catch((err) => {
                setErrors(err.message)
            })
        }catch (err) {
            console.log(err);
        }
        setProgress(false)
    }
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    {errors ? (<h5 className='error'>{errors}</h5>) : (<h5 className='error'></h5>)}
                    <FormInput 
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    {/* <hr style={{margin:10}}/> */}
                    {/* <p className="description"><strong>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias sint placeat adipisci, velit dolore quae suscipit harum perspiciatis ipsam illum corporis earum! Autem laborum rem odio consequatur rerum explicabo ullam!</strong></p> */}
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
