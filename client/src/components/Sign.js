import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LogInForm";
import Button from '@mui/material-next/Button';

function Sign() {
    const [register, setRegister] = useState(true)

    return (
        <div className="form-container">
            {register === true ? (
                <div>
                    <RegisterForm/>
                    <h3>Already a user ?</h3>
                    <div 
                        className="buttons" 
                        onClick={ () => setRegister( false ) }
                    >
                        <Button
                            size="large"
                            variant="filledTonal"
                            sx={{ m: 1 }}
                        >
                            Log In
                        </Button>
                    </div>
                </div>
            ): (
                <div>
                    <LogInForm/>
                    <h3>New user ?</h3>
                    <div 
                        className="buttons" 
                        onClick={ () => setRegister( true ) }
                    >
                        <Button
                            size="large"
                            variant="filledTonal"
                            sx={{ m: 1 }}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            )
            }
        </div>
    )}

export default Sign;
