// user.reducer.js >>> reducer it define wich functionality must happen 

import userTypes from "./user.types";

const INITIAL_STATE  ={
    currentUser:null,
    signInSuccess:false,
    signInError:[],
    signUpSuccess:false,
    signUpError: [],
    phoneLoginSuccess:false,
    phoneLoginError: [],
    resetPasswordSuccess:false,
    resetPasswordError:[],
};

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser:action.payload
            }
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                signInSuccess:action.payload
            }
        case userTypes.SIGN_IN_ERROR:
            return{
                ...state,
                signInError:action.payload
            }
        case userTypes.SIGN_UP_ERROR:
            return{
                ...state,
                signUpError:action.payload
            }
        case userTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                signUpSuccess:action.payload
            }
        case userTypes.PHONE_LOGIN_ERROR:
            return{
                ...state,
                phoneLoginError:action.payload
            }
        case userTypes.PHONE_LOGIN_SUCCESS:
            return{
                ...state,
                phoneLoginSuccess:action.payload
            }
        
        case userTypes.RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                resetPasswordSuccess :action.payload
            }
        
        case userTypes.RESET_PASSWORD_ERROR:
            return{
                ...state,
                resetPasswordError:action.payload
            }
        case userTypes.RESET_AUTH_FORMS:
            return{
                ...state,
                signInSuccess:false,
                signInError:[],
                signUpSuccess:false,
                signUpError: [],
                phoneLoginSuccess:false,
                phoneLoginError: [],
                resetPasswordSuccess:false,
                resetPasswordError:[],
            }
        
        default:
            return state;
    }
};

export default userReducer;