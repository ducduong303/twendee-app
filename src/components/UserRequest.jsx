
import React, { useState, useContext } from 'react';
import HeadingTitleContent from './HeadingTitleContent';
import { ContextProvider } from '../context/Context';
import isEmpty from 'validator/lib/isEmpty'


function UserRequest(props) {
    const { handleUsersRequest, user } = useContext(ContextProvider);

    const [requestUser, setRequestUser] = useState("1")
    const handleOnchageRequest = (e) => {
        setRequestUser(e.target.value)
        setValidateMsg("")
    }
    // Msg thông báo lỗi
    const [validateMsg, setValidateMsg] = useState("")

    const [requestDayOff, setRequestDayOff] = useState({
        email: user && user.email,
        startDate: "",
        endDate: "",
        reason: "",
    })
    const [requestcheckOut, setRequestcheckOut] = useState({
        email: user && user.email,
        startDate: ""
    })
    const [requestLateEarly, setRequestLateEarly] = useState({
        email: user && user.email,
        startDate: "",
        timeLate: "",
        timeEarly: "",
        reason: "",
    })
    const [requestOnsite, setRequestOnsite] = useState({
        email: user && user.email,
        startDate: "",
        endDate: "",
        reason: "",
    })

    // Validate
    const validateDayOff = () => {
        let msg = {};
        if (isEmpty(requestDayOff.startDate)) {
            msg.startDateDayOff = " Bạn chưa nhập ngày bắt đầu"
        }
        if (isEmpty(requestDayOff.endDate)) {
            msg.endDateDayOff = "Bạn chưa nhập ngày kết thúc"
        }
        if (isEmpty(requestDayOff.reason)) {
            msg.reasonDayOff = "Bạn chưa nhập lý do"
        }
        setValidateMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    const validateCheckOut = () => {
        let msg = {};
        if (isEmpty(requestcheckOut.startDate)) {
            msg.startDateCheckOut = " Bạn chưa nhập ngày bắt đầu"
        }
        setValidateMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    const validateLateEarly = () => {
        let msg = {};
        if (isEmpty(requestLateEarly.startDate)) {
            msg.startDateLateEarly = " Bạn chưa nhập ngày "
        }
        if (isEmpty(requestLateEarly.timeLate)) {
            msg.timeLate = "Bạn chưa nhập thời gian tới trễ"
        }
        if (isEmpty(requestLateEarly.timeEarly)) {
            msg.timeEarly = "Bạn chưa nhập thời gian về sớm"
        }
        if (isEmpty(requestLateEarly.reason)) {
            msg.reasonLateEarly = "Bạn chưa nhập lý do "
        }
        setValidateMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    const validateOnsite = () => {
        let msg = {};
        if (isEmpty(requestOnsite.startDate)) {
            msg.startDateOnSite = " Bạn chưa nhập ngày bắt đầu"
        }
        if (isEmpty(requestOnsite.endDate)) {
            msg.endDateOnSite = "Bạn chưa nhập ngày kết thúc"
        }
        if (isEmpty(requestOnsite.reason)) {
            msg.reasonOnSite = "Bạn chưa nhập lý do"
        }
        setValidateMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }


    const handleSubmitDayoff = (e) => {
        e.preventDefault()
        const isValid = validateDayOff()
        if (!isValid) return;
        handleUsersRequest(requestDayOff, requestUser)
        setRequestDayOff({
            email: "",
            startDate: "",
            endDate: "",
            reason: "",
        })
    }
    const handleSubmitCheckout = (e) => {
        e.preventDefault()
        const isValid = validateCheckOut()
        if (!isValid) return;
        handleUsersRequest(requestcheckOut, requestUser)
        setRequestcheckOut({
            email: user && user.email,
            startDate: ""
        })
    }
    const handleSubmitLateEarly = (e) => {
        e.preventDefault();
        const isValid = validateLateEarly()
        if (!isValid) return;
        handleUsersRequest(requestLateEarly, requestUser)
        setRequestLateEarly({
            email: user && user.email,
            startDate: "",
            timeLate: "",
            timeEarly: "",
            reason: "",
        })

    }
    const handleSubmitOnsite = (e) => {
        e.preventDefault();
        const isValid = validateOnsite()
        if (!isValid) return;
        // console.log("requestOnsite", requestOnsite);
        handleUsersRequest(requestOnsite, requestUser)
        setRequestOnsite({
            email: user && user.email,
            startDate: "",
            endDate: "",
            reason: "",
        })
    }

    const hanleChangeDayOff = (e) => {
        setRequestDayOff({
            ...requestDayOff,
            email: user && user.email,
            [e.target.name]: e.target.value,
        })
    }
    const handleChangeCheckOut = (e) => {
        setRequestcheckOut({
            ...requestcheckOut,
            email: user && user.email,
            [e.target.name]: e.target.value,
        })
    }
    const handleChangeLateEarly = (e) => {
        setRequestLateEarly({
            ...requestLateEarly,
            email: user && user.email,
            [e.target.name]: e.target.value,
        })
    }
    const handleChangeOnsite = (e) => {
        setRequestOnsite({
            ...requestOnsite,
            email: user && user.email,
            [e.target.name]: e.target.value,
        })
    }


    const handleRenderRequest = () => {
        let result;
        switch (requestUser) {
            case "1":
                result = (
                    <>
                        <div className="content__request-item content__request-dayoff">
                            <div className="content__request-box">
                                <h1 className="content__request-reasonTitle">
                                    Đơn Xin Nghỉ
                                 </h1>
                                <form onSubmit={handleSubmitDayoff} className="content__request-itemContent">
                                    <div className="content__request-itemContent-box col-lg-10">
                                        <div className="content__request-itemForm">
                                            <label htmlFor="">Email </label>
                                            <input type="email"
                                                name="email"
                                                disabled={user && user.email}
                                                defaultValue={user && user.email}
                                                placeholder="Email"
                                            />

                                        </div>
                                        <div className="content__request-group">
                                            <div className="content__request-itemForm  col-lg-5">
                                                <label htmlFor="">Ngày bắt đầu </label>
                                                <input type="date"
                                                    name="startDate"
                                                    value={requestDayOff.startDate}
                                                    onChange={hanleChangeDayOff}

                                                />
                                                <p>{validateMsg.startDateDayOff}</p>
                                            </div>
                                            <div className="content__request-itemForm col-lg-5">
                                                <label htmlFor="">Ngày kết thúc </label>
                                                <input type="date"
                                                    name="endDate"

                                                    value={requestDayOff.endDate}
                                                    onChange={hanleChangeDayOff}
                                                />
                                                <p>{validateMsg.endDateDayOff}</p>
                                            </div>
                                        </div>
                                        <div className="content__request-itemForm">
                                            <label htmlFor="">Lí do </label>
                                            <textarea rows="5"
                                                name="reason"
                                                cols="50"
                                                value={requestDayOff.reason}
                                                onChange={hanleChangeDayOff}
                                            />
                                            <p>{validateMsg.reasonDayOff}</p>
                                        </div>
                                        <button type="submit">Gửi</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
                break;
            case "2":
                result = (
                    <div className="content__request-item content__request-dayoff">
                        <div className="content__request-box">
                            <h3 className="content__request-reasonTitle">
                                Quên Điểm Danh
                        </h3>
                            <div className="content__request-itemContent">
                                <form onSubmit={handleSubmitCheckout} className="content__request-itemContent-box col-lg-10">
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Email </label>
                                        <input type="email"
                                            name="email"
                                            disabled={user && user.email}
                                            defaultValue={user && user.email}
                                            placeholder="Email" />

                                    </div>

                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Ngày</label>
                                        <input type="date"
                                            name="startDate"
                                            value={requestcheckOut.startDate}
                                            onChange={handleChangeCheckOut}
                                        />
                                        <p>{validateMsg.startDateCheckOut}</p>
                                    </div>
                                    <button type="submit">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
                break;
            case "3":
                result = (
                    <div className="content__request-item content__request-dayoff">
                        <div className="content__request-box">
                            <h3 className="content__request-reasonTitle">
                                Đi sớm về muộn
                        </h3>
                            <div className="content__request-itemContent">
                                <form onSubmit={handleSubmitLateEarly} className="content__request-itemContent-box col-lg-10">
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Email </label>
                                        <input type="email"
                                            name="email"
                                            // value={inputs.email}
                                            // onChange={hanleChange}
                                            disabled={user && user.email}
                                            defaultValue={user && user.email}
                                            placeholder="Email" />

                                    </div>
                                    <div className="content__request-itemForm ">
                                        <label htmlFor="">Ngày xin  </label>
                                        <input type="date"
                                            name="startDate"
                                            value={requestLateEarly.startDate}
                                            onChange={handleChangeLateEarly}
                                        />
                                        <p>{validateMsg.startDateLateEarly}</p>
                                    </div>
                                    <div className="content__request-group">
                                        <div className="content__request-itemForm  col-lg-5">
                                            <label htmlFor="">Thời gian đi muộn (phút)</label>
                                            <input type="number"
                                                name="timeLate"
                                                value={requestLateEarly.timeLate}
                                                onChange={handleChangeLateEarly}
                                            />
                                            <p>{validateMsg.timeLate}</p>
                                        </div>
                                        <div className="content__request-itemForm col-lg-5">
                                            <label htmlFor="">Thời gian về sớm (phút)</label>
                                            <input type="number"
                                                name="timeEarly"
                                                value={requestLateEarly.timeEarly}
                                                onChange={handleChangeLateEarly}
                                            />
                                            <p>{validateMsg.timeEarly}</p>
                                        </div>
                                    </div>
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Lí do </label>
                                        <textarea rows="5"
                                            name="reason"
                                            value={requestLateEarly.reason}
                                            onChange={handleChangeLateEarly}
                                            cols="50" />
                                        <p>{validateMsg.reasonLateEarly}</p>
                                    </div>
                                    <button type="submit">Gửi</button>
                                </form>

                            </div>
                        </div>
                    </div>
                )
                break;
            case "4":
                result = (
                    <div className="content__request-item content__request-dayoff">
                        <div className="content__request-box">
                            <h1 className="content__request-reasonTitle">
                                On Side
                         </h1>
                            <div className="content__request-itemContent">
                                <form onSubmit={handleSubmitOnsite} className="content__request-itemContent-box col-lg-10">
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Email </label>
                                        <input type="email"
                                            name="email"

                                            disabled={user && user.email}
                                            defaultValue={user && user.email}
                                        ></input>

                                    </div>
                                    <div className="content__request-group">
                                        <div className="content__request-itemForm  col-lg-5">
                                            <label htmlFor="">Ngày bắt đầu </label>
                                            <input type="date"
                                                name="startDate"
                                                value={requestOnsite.startDate}
                                                onChange={handleChangeOnsite}
                                            />
                                            <p>{validateMsg.startDateOnSite}</p>

                                        </div>
                                        <div className="content__request-itemForm col-lg-5">
                                            <label htmlFor="">Ngày kết thúc </label>
                                            <input type="date"
                                                name="endDate"
                                                value={requestOnsite.endDate}
                                                onChange={handleChangeOnsite}
                                            />
                                            <p>{validateMsg.endDateOnSite}</p>
                                        </div>
                                    </div>
                                    <div className="content__request-itemForm">
                                        <label htmlFor="">Lí do </label>
                                        <textarea rows="5"
                                            name="reason"
                                            value={requestOnsite.reason}
                                            onChange={handleChangeOnsite}
                                            cols="50" />
                                        <p>{validateMsg.reasonOnSite}</p>
                                    </div>
                                    <button type="submit">Gửi</button>
                                </form>

                            </div>
                        </div>
                    </div>
                )
                break;
            default:
                return result
        }

        return result
    }

    return (
        <>
            <HeadingTitleContent>Đơn Từ</HeadingTitleContent>
            <div className="content__request">
                <div className="content__request-container">
                    <div className="content__request-content col-lg-9 col-md-12 col-sm-12">
                        {handleRenderRequest()}
                    </div>

                    <div className="content__request-title col-lg-2 col-md-12 col-sm-12">
                        <select value={requestUser} onChange={handleOnchageRequest}>
                            <option value={1}>Xin nghỉ </option>
                            <option value={2}>Điểm danh hộ</option>
                            <option value={3}>Đi muộn về sớm</option>
                            <option value={4}>On site</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserRequest;