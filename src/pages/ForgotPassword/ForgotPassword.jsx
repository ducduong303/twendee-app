import React, { useContext} from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { BiLogInCircle } from 'react-icons/bi';
import { ContextProvider } from '../../context/Context';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
function ForgotPassword(props) {
    const history = useHistory('');
    const { handleForgotPassWord } = useContext(ContextProvider)
    let schema = yup.object().shape({
        email: yup.string().required().email(),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data,e) =>{
        handleForgotPassWord(data)
        e.target.reset()
    }
  const handleBack =() =>{
    history.push("/")
  }

   
    return (
        <div className="login">
            <div className="login-form col-lg-4 col-md-10 col-sm-12">
                <div className="login-form__box">
                    <div className="login-form__head">
                        <h3>TWENDEE</h3>
                    </div>
                    <h4 className="text-center">Enter your email and instructions will sent to you!</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form__center" >
                        <div  className="login-form__center-gr">
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
                            <button type="submit" className="login-form__center-btn" >Reset<BiLogInCircle size={25} className="icon" /></button>
                        </div>
                    
                    </form>
                    <div className="login-form__center-gr">
                            <button className="login-form__center-btn" onClick={handleBack}>Trở về</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;