import axios from 'axios';

export const isUserLoggedIn = () => {
    var logInCofig = {
        method: 'get',
        url: 'http://localhost:4000/pw-manager/auth/isloggedin',
        withCredentials: true,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    };
    axios(logInCofig).then((loginRes) => {
        return loginRes.data.loginStatus;
    }).catch((err) => {console.log("error");});
    // alert(loginStatus);

};

export default isUserLoggedIn;