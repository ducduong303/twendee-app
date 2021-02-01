import React, {useContext } from 'react';
import classNames from "classnames"
import { Link } from 'react-router-dom';
import logo from "../assets/image/logo.png";
import { BiLeftArrowAlt } from 'react-icons/bi';
import { SlideBarDataUser } from "../routers/SlideBarData"
import { ContextProvider } from '../context/Context';
function NavBarUser(props) {
    const { isShowNavBar, handleToggleShowNavBar, subMenu, seleced, handleActive, showSubNav } = useContext(ContextProvider);
    
    const renderNav = () => {
        let result;
        if (SlideBarDataUser.length > 0) {
            result = SlideBarDataUser.map((item, index) => {
                return (
                    <div key={index}>
                        <Link to={item.path}
                            className={`nav-bar__center-link `}
                            onClick={() => {
                                item.subNav && showSubNav()
                                handleActive(item.id)
                            }}
                        >
                            <div className={classNames("nav-bar__center-content", { contentActive: item.classActive }, {
                                activeColor: seleced === item.id
                            })}
                            >
                                {item.icon}
                                <span className={item.class}>{item.title}</span>
                            </div>
                            <>
                                {
                                    item.subNav && subMenu ? item.iconOpen : item.subNav ? item.iconClose : null
                                }
                            </>
                        </Link>
                        {
                            subMenu ? item.subNav && item.subNav.map((item, index) => {
                                return (
                                    <Link
                                        onClick={() => handleActive(item.id)}
                                        to={item.path} key={index}
                                        className={classNames("nav-bar__center-submenu", { activeColor: seleced === item.id })}>
                                        <span>{item.title}</span>
                                    </Link>
                                )
                            }) : null
                        }
                    </div>
                )

            })
        }
        return result
    }
    return (
        <div className={classNames("nav-bar", { activeNavBar: isShowNavBar })}>
            <div className="nav-bar__container">
                <div className="nav-bar__head">
                    <div className="nav-bar__head-box">
                        <img src={logo} alt="" />
                        <h3><Link to={"/users"}>TWENDEE</Link></h3>
                        <BiLeftArrowAlt size={25} onClick={handleToggleShowNavBar} className="icon" />
                    </div>
                </div>
                <div className="nav-bar__center">
                    {renderNav()}
                </div>
            </div>

        </div>
    );
}

export default NavBarUser;