import React, { useContext, useState } from 'react';
import { ContextProvider } from '../../context/Context';
import { FaUserAlt } from 'react-icons/fa';
import { BiKey, BiLogInCircle } from 'react-icons/bi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Validation from '../../hooks/Validation';
import UseForm from '../../hooks/UseForm';



function Login(props) {
    const { handleLoginUser } = useContext(ContextProvider)
    const [isPasswordShow, setIsPasswordShow] = useState(true);
    const { inputs, handleChange, handleSubmit, errors } = UseForm(handleLoginUser, Validation);

    const showPassword = () => {
        setIsPasswordShow(!isPasswordShow)
    }
        
    return (
        <div className="login">
            <div className="login-form col-lg-4 col-md-10 col-sm-12">
                <div className="login-form__box">
                    <div className="login-form__head">
                        <h3>TWENDEE</h3>
                    </div>
                    <form className="login-form__center" onSubmit={handleSubmit}>
                        <div className="login-form__center-gr">
                            <label htmlFor="email"> EMAIL</label>
                            <div className="login-form__center-input">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={inputs.email}
                                    onChange={handleChange}
                                    placeholder="Email" />

                                <span><FaUserAlt size={20} /></span>
                            </div>
                            {errors.email && <h5>{errors.email}</h5>}
                        </div>
                        <div className="login-form__center-gr">
                            <label htmlFor="password">PASSWORD</label>
                            <div className="login-form__center-input">
                                <input
                                    type={isPasswordShow ? "password" : "text"}
                                    id="password"
                                    name="password"
                                    value={inputs.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                <span><BiKey size={25} /></span>
                                <p onClick={showPassword}>{isPasswordShow ? <AiFillEyeInvisible size={20} /> : < AiFillEye size={20} />}</p>
                            </div>
                            {errors.password && <h5>{errors.password}</h5>}
                        </div>
                        <div className="login-form__center-gr">
                            <button className="login-form__center-btn" onClick={handleSubmit}>Log In <BiLogInCircle size={25} className="icon" /></button>
                            <h4 className="login-form__center-forgot"><Link to="/forgot-password">Forgot Password?</Link></h4>
                        </div>
                    </form>

                </div>

            </div>

        </div>
    );
}

export default Login;