import React, { useContext } from 'react';
import classNames from "classnames";
import avt from "../assets/image/avtuser.jpg";
import { AiOutlineBars } from 'react-icons/ai';
import { Route } from 'react-router-dom';

// import Component
import EmployeeManager from './EmployeeManager';
import TimekeepingManagementDay from './TimekeepingManagementDay';
import TimekeepingManagementMonth from './TimekeepingManagementMonth';
import ResquestManagement from './ResquestManagement';
import { ContextProvider } from '../context/Context';
import Logout from './Logout';
function ContentAdmin(props) {
    const { isShowNavBar, handleToggleShowNavBar, isLogin} = useContext(ContextProvider)
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
                <Route exact path="/admin/quanlynhanvien" component={EmployeeManager} />
                <Route exact path="/admin/quanlychamcong/theongay" component={TimekeepingManagementDay} />
                <Route exact path="/admin/quanlychamcong/theothang" component={TimekeepingManagementMonth} />
                <Route exact path="/admin/quanlydontu" component={ResquestManagement} />
            </div>
        </div>
    );
}

export default ContentAdmin;