import React, { useContext, useState } from 'react';
import { ContextProvider } from '../context/Context';
import { FiLogOut } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Logout(props) {
    const { handleLogOut, user } = useContext(ContextProvider)

    const [isSubMenu, setIsSubMenu] = useState(false)
    const handleSubMenu = () => {
        setIsSubMenu(!isSubMenu)
    }
    return (
        <div className="content__header-user">

            <h3>{user && user.name}</h3>
            <img src={user && user.avatar}
                onClick={handleSubMenu}
                onBlur={handleSubMenu}
                alt="" />
            {
                isSubMenu ? <div className="content__header-subUser">
                    <ul>
                        <li>
                            {
                                user.role ? <Link to="/admin/capnhatthongtin"><FaUserAlt /> Hồ sơ</Link> : <Link to="/users/capnhatthongtin"><FaUserAlt /> Hồ sơ</Link>
                            }
                        </li>
                        <li><p onClick={handleLogOut}> <FiLogOut size={20} /> Logout</p></li>
                    </ul>
                </div> : null
            }

        </div>
    );
}

export default Logout;