import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "./SignupStyle.css";
import { handleError, handleSuccess } from "../../toastmsg";

function Signup() {

    const [registerType, setRegisterType] = useState("user");
    const [signupInfo, setSignupInfo] = useState({
        UserEmail: "",
        UserPassword: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { UserEmail, UserPassword } = signupInfo;
        if (!UserEmail || !UserPassword) {
            return handleError('Fillup all information')
        }

        try {
            const url = `${import.meta.env.VITE_API_URL}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
            else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            }
            else if (!success) {
                handleError(message);
            }

        } catch (error) {
            handleError(error.message);
        }
    }
    return (
        <div className="container">
                <form onSubmit={handleSignUp}>
                <h1>Signup</h1>
                <div>
                    <label htmlFor='UserEmail'>Email</label>
                    <input
                        onChange={handleChange}
                        type="email" name='UserEmail' placeholder="Enter your email..." value={signupInfo.UserEmail} />

                </div>

                <div>
                    <label htmlFor='UserPassword'>Password</label>
                    <input onChange={handleChange}
                        type="password" name='UserPassword' placeholder="Enter your password..."
                        value={signupInfo.UserPassword} />

                </div>

                <button type="submit">Signup</button>

                <span>Already have an account?</span>

                <Link to="/login" >Login</Link>
            </form>
            
            
            

            <ToastContainer />

        </div>
    )
}
export default Signup;