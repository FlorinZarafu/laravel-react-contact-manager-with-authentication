const initialState = {
    authResponse: null
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "RESTART_AUTH_RESPONSE":
            return {
                ...state,
                authResponse: null
            };
        case "LOADING":
            return {
                ...state,
                authResponse: "loading..."
            };
        case "SHORT_PASSWORD":
            console.log(action);
            return {
                ...state,
                authResponse: "password is to short"
            };
        case "SIGNUP_SUCCESS":
            console.log(action);
            return {
                ...state,
                authResponse: "signup was succsefully done"
            };
        case "SIGNUP_ERORO":
            console.log(action);
            return {
                ...state,
                authResponse: action.res.message
            };
        case "CODE_ERROR":
            console.log(action);
            return {
                ...state,
                authResponse: "signup ERROR"
            };
        case "LOGIN_SUCCESS":
            console.log(action);
            return {
                ...state,
                authResponse: "LOGIN SUCCESSFULY"
            };
        case "LOGIN_ERROR":
            console.log(action);
            return {
                ...state,
                authResponse: action.res.message
            };
        default:
            return state;
    }
};

export default AuthReducer;
