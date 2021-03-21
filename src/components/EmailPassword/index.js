import React, {useState, useEffect} from 'react'
import "./styles.scss"

// React Router
import {useHistory, withRouter} from "react-router-dom"

// Components
import AuthWrapper from "./../AuthWrapper"
import FormInput from "./../forms/FormInput"
import Button from "./../forms/Button"

// Redux
import {useDispatch, useSelector} from "react-redux"
import {resetPassword, resetAllAuhtForms} from "./../../redux/User/user.actions"

// Firebase
// import {auth} from "./../../firebase/utils"
const mapState = ({user}) => ({
    resetPasswordSuccess:user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
});


function EmailPassword(props) {
    const {resetPasswordError, resetPasswordSuccess} = useSelector(mapState)
    const dispatch = useDispatch();
    //input fields
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState([]);
    const [progress, setProgress] = useState(false)
    
    // const history =useHistory();
    // const 
    // To define header
    const configAuthWrapper = {
        headline:'Email Password'
    }

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetAllAuhtForms())
            props.history.push('/login')
        }


    }, [resetPasswordSuccess])

    useEffect(() => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0){
            setErrors(resetPasswordError);
            console.log("ERRO", errors);
        }

    }, [resetPasswordError])

    // Submit
    const handleSubmit =  e => {
        e.preventDefault();
        setProgress(true)
        dispatch(resetPassword({email}))
        
        setProgress(false)
    }
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    {errors ? (<h5 className='error'>{errors.map((error) => {
                        return error
                    })}h</h5>) : (<h5 className='error'></h5>)}
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
