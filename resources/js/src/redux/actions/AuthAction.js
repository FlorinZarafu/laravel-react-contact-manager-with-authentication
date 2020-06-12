import { SignUpService } from "../services/AuthServices";
import { LoginUser } from "../services/AuthServices";

export const signUp = credentials => {
    console.log(credentials);
    return dispatch => {
        if (credentials.password.length < 6) {
            return dispatch({ type: "SHORT_PASSWORD" });
        }

        SignUpService(credentials).then(
            res => {
                console.log(res);
                if (res.token !== null) {
                    localStorage.setItem("user", "Bearer " + res.token);
                    dispatch({ type: "SIGNUP_SUCCESS" });
                } else {
                    dispatch({ type: "SIGNUP_ERROR", res });
                }
            },
            error => {
                dispatch({ type: "SIGNUP_ERROR", error });
            }
        );
    };
};

export const loginUser = (credentials, history) => {
    return dispatch => {
        if (credentials.password.length < 6) {
            return dispatch({ type: "SHORT_PASSWORD" });
        }
        LoginUser(credentials, history).then(
            res => {
                console.log(res);
                if (res.success == true) {
                    localStorage.setItem("user", "Bearer " + res.token);
                    dispatch({ type: "LOGIN_SUCCESS" });
                    history.push("/dashboard");
                } else {
                    dispatch({ type: "LOGIN_ERROR", res });
                }
            },
            error => {
                dispatch({ type: "CODE_ERROR", error });
                console.log(error);
            }
        );
    };
};

// export const loginUser = (credentials, history) => {
//     return dispatch => {
//         if (credentials.password.length < 6) {
//             return dispatch({ type: "SHORT_PASSWORD" });
//         }
//         LoginUser(credentials, history).then(
//             res => {
//                 console.log(res);
//                 if (res.success == true) {
//                     localStorage.setItem("user", "Bearer " + res.token);
//                     dispatch({ type: "LOGIN_SUCCESS" });
//                     history.push("/dashboard");
//                 } else {
//                     dispatch({ type: "LOGIN_ERROR", res });
//                 }
//             },
//             error => {
//                 dispatch({ type: "SIGNUP_ERROR", error });
//             }
//         );
//     };
// };
