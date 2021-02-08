import React, { useContext, useState } from 'react';
import { ContextProvider } from '../../context/Context';
import { FaUserAlt } from 'react-icons/fa';
import { BiKey, BiLogInCircle } from 'react-icons/bi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

let schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
});
function Login(props) {
    const { handleLoginUser } = useContext(ContextProvider)
    const [isPasswordShow, setIsPasswordShow] = useState(true);

   
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });
    const showPassword = () => {
        setIsPasswordShow(!isPasswordShow)
    }
    
    const onSubmit = (data,e) =>{
        handleLoginUser(data)
        // e.target.reset()
    }
    return (
        <div className="login">
            <div className="login-form col-lg-4 col-md-10 col-sm-12">
                <div className="login-form__box">
                    <div className="login-form__head">
                        <h3>TWENDEE</h3>
                    </div>
                    <form className="login-form__center" onSubmit={handleSubmit(onSubmit)}>
                        <div className="login-form__center-gr">
                            <label htmlFor="email"> EMAIL</label>
                            <div className="login-form__center-input">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    ref={register}
                                    placeholder="Email" />

                                <span><FaUserAlt size={20} /></span>
                            </div>
                            {errors.email && errors.email.type === "required" ? <p>{errors.email.type === "required" && "Bạn chưa nhập Email"}</p> : null}
                            {errors.email && errors.email.type === "email" ? <p>{errors.email.type === "email" && "Email không hợp lệ"}</p> : null}
    
                        </div>
                        <div className="login-form__center-gr">
                            <label htmlFor="password">PASSWORD</label>
                            <div className="login-form__center-input">
                                <input
                                    type={isPasswordShow ? "password" : "text"}
                                    id="password"
                                    name="password"
                               
                                    ref={register}
                                    placeholder="Password"
                                />
                                <span><BiKey size={25} /></span>
                                <b className="btn-visible" onClick={showPassword}>{isPasswordShow ? <AiFillEyeInvisible size={20} /> : < AiFillEye size={20} />}</b>
                            </div>
                            {errors.password && errors.password.type === "required" ? <p>{errors.password.type === "required" && "Bạn chưa nhập password"}</p> : null}
                            {errors.password && errors.password.type === "min" ? <p>{errors.password.type === "min" && "Mật khẩu ít nhất 6 ký tự"}</p> : null}
                        </div>
                        <div className="login-form__center-gr">
                            <button className="login-form__center-btn" type="submit">Log In <BiLogInCircle size={25} className="icon" /></button>
                            <h4 className="login-form__center-forgot"><Link to="/forgot-password">Forgot Password?</Link></h4>
                        </div>
                    </form>

                </div>

            </div>

        </div>
    );
}

export default Login;