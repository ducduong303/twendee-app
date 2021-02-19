import React, { useContext } from 'react';
import HeadingTitleContent from "./HeadingTitleContent";
import { ContextProvider } from '../context/Context';
function UserTimekeeping(props) {

    const {  user,  handleTimeKeeping } = useContext(ContextProvider)

    return (
        <>
            <HeadingTitleContent>Điểm danh</HeadingTitleContent>
            <div className="content__timekeeping">
                <div className="content__timekeeping-container">
                    <div className="content__timekeeping-btn">
                        <button onClick={() =>handleTimeKeeping(user.email,1)}>Check in</button>
                        <button onClick={() =>handleTimeKeeping(user.email,2)}>Check out</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default UserTimekeeping;