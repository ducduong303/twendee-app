import React, { useContext } from 'react';
import avt from "../assets/image/avtuser.jpg";
import classNames from "classnames"
import { AiOutlineBars } from 'react-icons/ai';

// import Component
import UserTimekeeping from "./UserTimekeeping";
import TimekeepingHistory from "./TimekeepingHistory";
import UserRequest from "./UserRequest";
import UpdateProfie from "./UpdateProfie";

import { Route } from 'react-router-dom';
import { ContextProvider } from '../context/Context';
import Logout from './Logout';
function ContentUser(props) {
    const { isShowNavBar,handleToggleShowNavBar,isLogin } = useContext(ContextProvider)
    return (

        <div className={classNames("content", { activeContent: isShowNavBar })}>
            <div className="content__header">
                <div className="content__header-container">
                    <AiOutlineBars size={25} className="icon" onClick={handleToggleShowNavBar} />
                    {
                        isLogin ? <Logout /> : <>
                            <h3>Chưa Đăng Nhập<img src={avt} className="content__header-img" alt="" /></h3>
                        </>
                    }
                </div>
            </div>
            <div className="content__body">
                <div className="content__body-container">
                    <Route exact path="/users/diemdanh" component={UserTimekeeping} />
                    <Route path="/users/lichsudiemdanh" component={TimekeepingHistory} />
                    <Route path="/users/dontu" component={UserRequest} />
                    <Route path="/users/capnhatthongtin" component={UpdateProfie} />
                </div>
            </div>
        </div>
    );
}

export default ContentUser;