// for dispatching
import {auth, handleUserProfile, GoogleProvider} from "./../../firebase/utils"
import firebase from "./../../firebase/utils"

import userTypes from "./user.types";

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload:user
});

export const signInUser = ({email, password}) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type:userTypes.SIGN_IN_SUCCESS,
            payload:true
        });
    }catch (err) {
        dispatch({
            type: userTypes.SIGN_IN_ERROR,
            payload: err.message
        });
        // setErrors(err)
        console.log(err, "ERROR from sign in component");
    }
}


export const signUpUser = ({ displayName, email, password, confirmPassword}) => async dispatch => {
    if (password !== confirmPassword) {
        const err = ['Password don\'t match']
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        });
        return
    }

    try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        await handleUserProfile(user, { displayName })
        dispatch({
            type:userTypes.SIGN_UP_SUCCESS,
            payload:true
        });
        
    }catch(err) {
        // catched error
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err.message
        });
    }
}

export const resetPassword = ({email}) => async dispatch => {
    const config = {
        url: "http://localhost:3000/login"
    }
    try {
        await auth.sendPasswordResetEmail(email,config)
        .then(() => {  
            dispatch({
                type:userTypes.RESET_PASSWORD_SUCCESS,
                payload:true
            })              
        })
        .catch(() => {
            const err = ['Email not found. Please try again.']
            dispatch(() => ({
                type:userTypes.RESET_PASSWORD_ERROR,
                payload:err
            }))
            console.log("error from email Password 1", err);
        })
    }catch (err) {
        dispatch(() => ({
            type:userTypes.RESET_PASSWORD_ERROR,
            payload:err
        }))
        console.log("error from email Password 2", err);
    }
}

export const signInWithGoogle = () =>async dispatch =>{
    try {
        await auth.signInWithPopup(GoogleProvider)
        .then(() => {
            dispatch({
                type:userTypes.SIGN_IN_SUCCESS,
                payload:true
            }) 
        })
    } catch (error) {
        dispatch({
            type: userTypes.SIGN_IN_ERROR,
            payload: error.message
        });
        console.log((error, "error"));
    }
     
}

export const resetAllAuhtForms = () => ({
    type:userTypes.RESET_AUTH_FORMS
})

export const phoneLogin = ({phoneNumber, recaptcha}) => async dispatch => {
    try {
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha).then((confirmationResult) => {
            console.log(confirmationResult, "Confirmation Result")
            const code = prompt("ENter a code>>> ")
            confirmationResult.confirm(code).then((result) => {
                console.log("SUUCCCESSS", result.user);
                dispatch({
                    type:userTypes.PHONE_LOGIN_SUCCESS,
                    payload:true
                }) 
            }).catch((err) => {
                dispatch({
                    type:userTypes.PHONE_LOGIN_ERROR,
                    payload:err.message
                })
                // setErrors(err)
                console.log(err, "second error");
            })
        }).catch((err)=> {
            dispatch({
                type:userTypes.PHONE_LOGIN_ERROR,
                payload:err.message
            })
            // setErrors(err)
            console.log("First eroor", err)})
    }catch (error) {
        dispatch({
            type:userTypes.PHONE_LOGIN_ERROR,
            payload:error.message
        })
    }
    
}