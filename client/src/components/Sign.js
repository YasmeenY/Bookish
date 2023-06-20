import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LogInForm"

function Sign() {
    const [register, setRegister] = useState(true)


    return (
        <div className="Sign">
            {register === true ? (
                <div>
                    <RegisterForm/>
                    <h3>Already a user ?</h3>
                    <button onClick={ () => setRegister( false ) } >Log In</button>
                </div>
            ): (
                <div>
                    <LogInForm/>
                    <h3>New user ?</h3>
                    <button onClick={ () => setRegister( true ) } >Register</button>
                </div>
            )
            }
        </div>
    )}

export default Sign;
