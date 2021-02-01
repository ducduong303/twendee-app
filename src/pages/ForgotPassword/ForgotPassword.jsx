import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { BiLogInCircle } from 'react-icons/bi';

function ForgotPassword(props) {
    return (
        <div className="login">
            <div className="login-form col-lg-4 col-md-10 col-sm-12">
                <div className="login-form__box">
                    <div className="login-form__head">
                        <h3>TWENDEE</h3>
                    </div>
                    <h4 className="text-center">Enter your email and instructions will sent to you!</h4>
                    <form className="login-form__center">
                        <div className="login-form__center-gr">
                            <label htmlFor="email"> EMAIL</label>
                            <div className="login-form__center-input">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email" />
                                <span><FaUserAlt size={20} /></span>
                            </div> 
                        </div>
                        <div className="login-form__center-gr">
                            <button className="login-form__center-btn" >Reset<BiLogInCircle size={25} className="icon" /></button>
                           
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;