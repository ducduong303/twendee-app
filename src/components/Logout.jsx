import React, { useContext } from 'react';
import { ContextProvider } from '../context/Context';

function Logout(props) {
    const {handleLogOut} = useContext(ContextProvider)
    return (
        <div>
            <button onClick={handleLogOut}>LogOut</button>
        </div>
    );
}

export default Logout;