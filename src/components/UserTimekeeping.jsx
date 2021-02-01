import React, { useContext } from 'react';
import HeadingTitleContent from "./HeadingTitleContent";
import { ContextProvider } from '../context/Context';
function UserTimekeeping(props) {

    const { isCheckin, handleCheckin, handleCheckout } = useContext(ContextProvider)

    const mess = () => {
        let result;
        if (isCheckin === null) {
            result = "Vui lòng check in"
        } else if (isCheckin === true) {
            result = "Điểm danh thành công"
        } else {
            result = "Check out thành công "
        }
        return result;
    }
    return (
        <>
            <HeadingTitleContent>Điểm danh</HeadingTitleContent>
            <div className="content__timekeeping">
                <div className="content__timekeeping-container">
                    <h3>{mess()}</h3>
                    <div className="content__timekeeping-btn">
                        <button onClick={handleCheckin} disabled={isCheckin ? true : false}>Check in</button>
                        <button onClick={handleCheckout} disabled={isCheckin ? false : true}>Check out</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default UserTimekeeping;