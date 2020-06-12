import HttpServices from "./HttpServices";

export const SignUpService = credentials => {
    const http = new HttpServices();
    console.log(HttpServices);
    let signUpUrl = "user/register";
    return http
        .postData(credentials, signUpUrl)
        .then(data => {
            console.log(JSON.stringify(data));
            return data;
        })
        .catch(error => console.log(error));
};

export const LoginUser = (credentials, propsHistory) => {
    const http = new HttpServices();
    console.log(HttpServices);
    let signUpUrl = "user/login";
    return http
        .postData(credentials, signUpUrl)
        .then(data => {
            console.log(JSON.stringify(data));
            return data;
        })
        .catch(error => {
            console.log(error);
            return error;
        });
};

// export const LoginUser = (credentials, propsHistory) => {
//     const http = new HttpServices();
//     console.log(HttpServices);
//     let signUpUrl = "user/login";
//     return http
//         .postData(credentials, signUpUrl)
//         .then(data => {
//             console.log(JSON.stringify(data));
//             return data;
//         })
//         .catch(error => console.log(error));
// };
