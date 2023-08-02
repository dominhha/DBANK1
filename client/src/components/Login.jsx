import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

import "../../public/style.css";

const clientId = "914585896754-jpioum9hv1nuvhp3n09amjh2d5d9n80i.apps.googleusercontent.com";

const Login = () => {
    const navigate = useNavigate();

    const reponseGoogle = (response) => {
        const details = jwt_decode(response.credential);
        console.log(details);

        localStorage.setItem('user', JSON.stringify(details));

        console.log(localStorage.getItem('user'));
        navigate('/');
    }

    return (
        <div className='box'>
            <div className="signin">
                <div className="content">
                    <h2>Log In</h2>
                    <div className='inputBox'>
                        <GoogleOAuthProvider clientId={clientId}>
                            <GoogleLogin
                                onSuccess={reponseGoogle}
                                onError={() => { console.log('Login failed!'); }}
                                buttonText="Login with Google"
                                responseType="code,token"
                            >
                            </GoogleLogin>
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;